import AWS from "aws-sdk";
import { createMockS3Url } from "./s3Mock";

// S3 설정 (실제 배포 시에는 환경 변수로 관리해야 함)
const S3_CONFIG = {
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
  bucketName: import.meta.env.VITE_S3_BUCKET_NAME,
};

// 브라우저 환경에서 AWS SDK 설정
AWS.config.update({
  region: S3_CONFIG.region,
});

// S3 클라이언트 초기화
const s3 = new AWS.S3({
  accessKeyId: S3_CONFIG.accessKeyId,
  secretAccessKey: S3_CONFIG.secretAccessKey,
  region: S3_CONFIG.region,
});

// 파일 유형에 따른 폴더 구조 결정
const getS3Folder = (fileType: string): string => {
  if (fileType.startsWith("image/")) {
    return "thumbnails/";
  } else if (fileType.startsWith("video/")) {
    return "videos/";
  }
  return "others/";
};

// S3에 파일 업로드 후 URL 반환
export const uploadFileToS3 = async (file: File): Promise<string> => {
  // 개발 환경에서는 항상 Mock S3 URL 사용 (브라우저 호환성 문제 방지)
  if (import.meta.env.MODE !== "production" || typeof window !== "undefined") {
    return createMockS3Url(file);
  }

  // 아래 코드는 서버사이드에서만 실행됨
  // 파일 유형에 기반한 폴더 경로 결정
  const folder = getS3Folder(file.type);

  // 고유한 파일명 생성 (타임스탬프 + 원본 파일명)
  const timestamp = new Date().getTime();
  const uniqueFileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
  const key = `${folder}${uniqueFileName}`;

  // S3 업로드 파라미터
  const params = {
    Bucket: S3_CONFIG.bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
    ACL: "public-read", // 공개 읽기 권한 설정
  };

  try {
    // S3에 파일 업로드
    await s3.upload(params).promise();

    // S3 URL 생성 및 반환
    return `https://${S3_CONFIG.bucketName}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("S3 업로드 실패:", error);
    throw new Error("File upload failed. Please try again.");
  }
};

// 여러 파일 동시 업로드 (Promise.all 사용)
export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadFileToS3(file));
  return Promise.all(uploadPromises);
};

// S3에서 파일 삭제
export const deleteFileFromS3 = async (fileUrl: string): Promise<boolean> => {
  // 개발 환경 또는 브라우저에서는 실제 삭제 작업 스킵
  if (import.meta.env.MODE !== "production" || typeof window !== "undefined") {
    return true;
  }

  try {
    // URL에서 키(Key) 추출
    const urlParts = fileUrl.split("/");
    const key = urlParts.slice(3).join("/");

    const params = {
      Bucket: S3_CONFIG.bucketName,
      Key: key,
    };

    // S3에서 파일 삭제
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error("S3 파일 삭제 실패:", error);
    return false;
  }
};

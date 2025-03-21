// S3 모의 서비스 - 가상 파일 저장 위치 관리

// 파일 타입에 따른 기본 이미지/동영상 매핑 (기존 public 폴더 파일 사용)
const defaultFiles = {
  image: {
    jpg: "/avatar-1.png", // 이미 public 폴더에 있는 이미지 사용
    png: "/avatar-2.png",
    gif: "/slotMachine.gif",
  },
  video: {
    mp4: "/slotMachine.mp4", // 이미 public 폴더에 있는 비디오 사용
    webm: "/slotMachine.mp4",
    ogg: "/slotMachine.mp4",
  },
};

// 파일 확장자 가져오기
export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || "";
};

// 파일 매핑
export const mapToDefaultFile = (file: File): string => {
  const extension = getFileExtension(file.name);

  if (file.type.startsWith("image/")) {
    // 이미지 파일의 경우
    if (extension in defaultFiles.image) {
      return defaultFiles.image[extension as keyof typeof defaultFiles.image];
    }
    // 기본 이미지 반환
    return defaultFiles.image.jpg;
  } else if (file.type.startsWith("video/")) {
    // 비디오 파일의 경우
    if (extension in defaultFiles.video) {
      return defaultFiles.video[extension as keyof typeof defaultFiles.video];
    }
    // 기본 비디오 반환
    return defaultFiles.video.mp4;
  }

  // 기타 파일 타입은 기본 이미지 반환
  return defaultFiles.image.jpg;
};

// 테스트를 위한 가상 S3 경로 생성 (URL 유일성 보장)
export const createMockS3Url = (file: File): string => {
  // 실제 파일 대신 미리 준비된 파일 경로 사용
  // if (import.meta.env.MODE !== "production") {
  //   // 타임스탬프를 추가하여 URL 유일성 보장 (캐시 방지)
  //   const timestamp = new Date().getTime();
  //   const baseUrl = mapToDefaultFile(file);

  //   // URL에 쿼리 파라미터 추가
  //   return `${baseUrl}?v=${timestamp}`;
  // }

  // 개발 환경이 아닌 경우는 빈 문자열 반환
  return "";
};

import {
  COOKIE_NAMES,
  getObjectCookie,
  setObjectCookie,
  deleteCookie,
  setCookie,
  getCookie,
} from "./cookieStorage";
import { uploadFileToS3 } from "./s3Service";

// 사용자 타입 정의
export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  profileImage?: string;
  createdAt: string;
}

// 비디오 타입 정의
export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  userId: string;
  userName?: string;
  videoSrc: string;
  thumbnail: string;
  copyright: string;
  views: number;
  likes: number;
  createdAt: string;
}

// 인증 API
export const authApi = {
  // 회원가입
  signup: async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean }> => {
    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    // 비밀번호 유효성 검사
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // 사용자 목록 가져오기
    const users = getObjectCookie<User[]>(COOKIE_NAMES.USER_INFO) || [];

    // 이메일 중복 확인
    if (users.some((user) => user.email === email)) {
      throw new Error("This email is already in use.");
    }

    // 새 사용자 추가
    const newUser: User = {
      id: generateId(),
      email,
      password, // 실제로는 암호화해야 함
      name: name || email.split("@")[0],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    setObjectCookie(COOKIE_NAMES.USER_INFO, users);

    return { success: true };
  },

  // 로그인
  login: async (
    email: string,
    password: string
  ): Promise<{ token: string; user: Omit<User, "password"> }> => {
    const users = getObjectCookie<User[]>(COOKIE_NAMES.USER_INFO) || [];

    // 사용자 찾기
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // 토큰 생성 (실제로는 JWT 등을 사용해야 함)
    const token = generateToken(user.id);
    setCookie(COOKIE_NAMES.AUTH_TOKEN, token);

    // 비밀번호 제외하고 사용자 정보 반환
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  },

  // 로그아웃
  logout: (): void => {
    deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: async (): Promise<{
    user: Omit<User, "password"> | null;
  }> => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    if (!token) {
      return { user: null };
    }

    const userId = parseToken(token);
    const users = getObjectCookie<User[]>(COOKIE_NAMES.USER_INFO) || [];
    const user = users.find((u) => u.id === userId);

    if (!user) {
      deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
      return { user: null };
    }

    // 비밀번호 제외하고 사용자 정보 반환
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  },

  // 토큰 검증
  validateToken: (): boolean => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    if (!token) return false;

    const userId = parseToken(token);
    const users = getObjectCookie<User[]>(COOKIE_NAMES.USER_INFO) || [];
    return users.some((u) => u.id === userId);
  },

  // 비밀번호 변경
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean }> => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const userId = parseToken(token);
    const users = getObjectCookie<User[]>(COOKIE_NAMES.USER_INFO) || [];

    // 현재 사용자 찾기
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    // 현재 비밀번호 확인
    if (users[userIndex].password !== currentPassword) {
      throw new Error("현재 비밀번호가 일치하지 않습니다.");
    }

    // 비밀번호 변경 (실제로는 보안을 위해 암호화해야 함)
    users[userIndex].password = newPassword;

    // 사용자 정보 업데이트
    setObjectCookie(COOKIE_NAMES.USER_INFO, users);

    return { success: true };
  },
};

// 비디오 API
export const videoApi = {
  // 모든 비디오 가져오기
  getAllVideos: async (category?: string): Promise<{ videos: Video[] }> => {
    const videos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS) || [];

    // 카테고리로 필터링
    const filteredVideos = category
      ? videos.filter((video) => video.category === category)
      : videos;

    return { videos: filteredVideos };
  },

  // 비디오 상세 정보 가져오기
  getVideo: async (id: string): Promise<{ video: Video | null }> => {
    const videos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS) || [];
    const video = videos.find((v) => v.id === id);

    if (video) {
      // 조회수 증가
      const updatedVideos = videos.map((v) =>
        v.id === id ? { ...v, views: v.views + 1 } : v
      );
      setObjectCookie(COOKIE_NAMES.VIDEOS, updatedVideos);
    }

    return { video: video || null };
  },

  // 내 비디오 목록 가져오기
  getMyVideos: async (): Promise<{ videos: Video[] }> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error("Login required.");
    }

    const videos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS) || [];
    const myVideos = videos.filter((video) => video.userId === userId);

    return { videos: myVideos };
  },

  // 비디오 업로드
  uploadVideo: async (formData: FormData): Promise<{ video: Video }> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error("Login required.");
    }

    const users = getObjectCookie<User[]>(COOKIE_NAMES.USER_INFO) || [];
    const currentUser = users.find((u) => u.id === userId);

    if (!currentUser) {
      throw new Error("User not found.");
    }

    // FormData에서 정보 추출
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const copyright = formData.get("copyright") as string;

    // 파일 처리 (실제 구현에서는 파일 업로드 처리)
    // 여기서는 File 객체의 이름만 저장
    const thumbnailFile = formData.get("thumbnail") as File;
    const videoFile = formData.get("video") as File;

    if (!title || !description || !category || !thumbnailFile || !videoFile) {
      throw new Error("Please fill in all required fields.");
    }

    try {
      // S3에 파일 업로드
      const thumbnailUrl = await uploadFileToS3(thumbnailFile);
      const videoUrl = await uploadFileToS3(videoFile);

      console.log(thumbnailUrl, videoUrl);

      // 새 비디오 객체 생성
      const newVideo: Video = {
        id: generateId(),
        title,
        description,
        category,
        userId,
        userName: currentUser.name,
        videoSrc: videoUrl, // S3 URL 사용
        thumbnail: thumbnailUrl, // S3 URL 사용
        copyright: copyright || "All rights reserved",
        views: 0,
        likes: 0,
        createdAt: new Date().toISOString(),
      };

      // 비디오 목록에 추가
      const videos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS) || [];
      videos.push(newVideo);
      setObjectCookie(COOKIE_NAMES.VIDEOS, videos);

      return { video: newVideo };
    } catch (error) {
      console.error("비디오 업로드 오류:", error);
      throw error;
    }
  },

  // 비디오 삭제
  deleteVideo: async (videoId: string): Promise<{ success: boolean }> => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const userId = parseToken(token);
    const videos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS) || [];

    // 비디오 찾기
    const videoIndex = videos.findIndex((v) => v.id === videoId);

    if (videoIndex === -1) {
      throw new Error("비디오를 찾을 수 없습니다.");
    }

    // 비디오 소유자 확인
    if (videos[videoIndex].userId !== userId) {
      throw new Error("비디오를 삭제할 권한이 없습니다.");
    }

    // 비디오 삭제
    videos.splice(videoIndex, 1);

    // 비디오 목록 업데이트
    setObjectCookie(COOKIE_NAMES.VIDEOS, videos);

    return { success: true };
  },

  // 비디오 좋아요
  likeVideo: async (id: string): Promise<{ success: boolean }> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error("Login required.");
    }

    const videos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS) || [];
    const videoIndex = videos.findIndex((v) => v.id === id);

    if (videoIndex === -1) {
      throw new Error("Video not found.");
    }

    // 좋아요 수 증가
    videos[videoIndex] = {
      ...videos[videoIndex],
      likes: videos[videoIndex].likes + 1,
    };

    setObjectCookie(COOKIE_NAMES.VIDEOS, videos);
    return { success: true };
  },
};

// 카테고리 API
export const categoryApi = {
  getCategories: async (): Promise<{ categories: string[] }> => {
    const categories = getObjectCookie<string[]>(COOKIE_NAMES.CATEGORIES) || [];
    return { categories };
  },
};

// 도우미 함수들
// 현재 로그인한 사용자 ID 가져오기
const getCurrentUserId = (): string | null => {
  const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
  if (!token) return null;
  return parseToken(token);
};

// 간단한 랜덤 ID 생성기
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// 간단한 토큰 생성 (실제로는 JWT 등을 사용해야 함)
const generateToken = (userId: string): string => {
  return `${userId}_${Date.now()}`;
};

// 간단한 토큰 파싱 (실제로는 JWT 검증 등을 해야 함)
const parseToken = (token: string): string => {
  return token.split("_")[0];
};

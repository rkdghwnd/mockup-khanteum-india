// 쿠키 스토리지 유틸리티 함수

// 비디오 타입 정의 (쿠키저장용)
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

// 쿠키 설정하기
export const setCookie = (name: string, value: string, days = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// 쿠키 가져오기
export const getCookie = (name: string) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
};

// 쿠키 삭제하기
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// 객체 값을 쿠키에 저장
export const setObjectCookie = (name: string, value: object, days = 30) => {
  const stringValue = JSON.stringify(value);
  setCookie(name, stringValue, days);
};

// 쿠키에서 객체 값 가져오기
export const getObjectCookie = <T>(name: string): T | null => {
  const cookieValue = getCookie(name);
  if (!cookieValue) return null;
  try {
    return JSON.parse(cookieValue) as T;
  } catch (e) {
    console.error("쿠키 파싱 오류:", e);
    return null;
  }
};

// 사용자 관련 쿠키 이름
export const COOKIE_NAMES = {
  AUTH_TOKEN: "auth_token",
  USER_INFO: "user_info",
  VIDEOS: "videos",
  CATEGORIES: "categories",
};

// 기본 카테고리 데이터
export const DEFAULT_CATEGORIES = [
  "Music",
  "Dance",
  "Art",
  "Fashion",
  "Sports",
  "Cooking",
  "Beauty",
];

// 초기 비디오 데이터 설정
export const initializeVideos = () => {
  const existingVideos = getObjectCookie<Video[]>(COOKIE_NAMES.VIDEOS);
  if (!existingVideos) {
    setObjectCookie(COOKIE_NAMES.VIDEOS, []);
  }
};

// 초기 카테고리 데이터 설정
export const initializeCategories = () => {
  const existingCategories = getObjectCookie<string[]>(COOKIE_NAMES.CATEGORIES);
  if (!existingCategories) {
    setObjectCookie(COOKIE_NAMES.CATEGORIES, DEFAULT_CATEGORIES);
  }
};

// 스토리지 초기화
export const initializeStorage = () => {
  initializeVideos();
  initializeCategories();
};

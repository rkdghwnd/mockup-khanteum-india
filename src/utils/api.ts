import axios, { InternalAxiosRequestConfig } from "axios";

const API_URL = "http://localhost:5000/api";

// 기본 axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인증 관련 API
export const authAPI = {
  // 회원가입 - 간소화된 버전 (이름 없이 아이디와 비밀번호만)
  signup: async (email: string, password: string) => {
    const response = await api.post("/auth/signup", { email, password });
    return response.data;
  },

  // 로그인
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("token");
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// 비디오 관련 API
export const videoAPI = {
  // 모든 비디오 가져오기
  getAllVideos: async (category?: string) => {
    const params = category ? { category } : {};
    const response = await api.get("/videos", { params });
    return response.data;
  },

  // 비디오 상세 정보 가져오기
  getVideo: async (id: string) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  // 내 비디오 목록 가져오기
  getMyVideos: async () => {
    const response = await api.get("/videos/me/videos");
    return response.data;
  },

  // 비디오 업로드
  uploadVideo: async (formData: FormData) => {
    const response = await api.post("/videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // 비디오 삭제
  deleteVideo: async (id: string) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  // 비디오 스트리밍 URL 가져오기
  getVideoStreamUrl: (id: string) => {
    return `${API_URL}/videos/${id}/stream`;
  },
};

export default api;

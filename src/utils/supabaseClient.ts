import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 Supabase URL과 Anon Key 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 환경 변수 확인
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
}

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 간소화된 데이터베이스 타입 정의
export type Database = {
  public: {
    Tables: {
      // 사용자 테이블 정의
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          profile_image: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          profile_image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          profile_image?: string | null;
          created_at?: string;
        };
      };
      // 비디오 테이블 정의
      videos: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          user_id: string;
          video_url: string;
          thumbnail_url: string;
          copyright: string;
          views: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          user_id: string;
          video_url: string;
          thumbnail_url: string;
          copyright: string;
          views?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          user_id?: string;
          video_url?: string;
          thumbnail_url?: string;
          copyright?: string;
          views?: number;
          created_at?: string;
        };
      };
    };
    // 함수 정의
    Functions: {
      // 조회수 증가 함수
      increment_view_count: {
        Args: {
          video_id: string;
        };
        Returns: void;
      };
    };
  };
};

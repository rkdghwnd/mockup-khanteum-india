import { supabase } from "../utils/supabaseClient";

/**
 * 사용자 정보 타입 정의
 */
export interface User {
  id: string;
  email: string;
  name?: string | null;
  profileImage?: string | null;
  createdAt: string;
}

/**
 * 인증 서비스 객체
 * - 회원가입, 로그인, 로그아웃 및 사용자 정보 관리 기능
 */
export const authService = {
  /**
   * 회원가입 함수
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @param name 사용자 이름 (선택사항)
   */
  signup: async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // 이메일/비밀번호로 회원가입 - 메타데이터 설정
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split("@")[0], // 이름이 없으면 이메일에서 추출
          },
        },
      });

      if (error) {
        console.log("회원가입 오류:", error.message);
        throw error;
      }

      // 성공 시 바로 로그인까지 시도
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { success: true };
    } catch (error: unknown) {
      console.error("회원가입 오류:", error);

      // 느슨한 인증 정책: 이메일 형식이 아니어도 허용하기 위한 임시 처리
      if (error instanceof Error && error.message.includes("valid email")) {
        try {
          // 간단한 이메일 형식으로 변환하여 재시도
          const tempEmail = `${email.replace(/[^a-zA-Z0-9]/g, "")}@temp.com`;
          const { error: retryError } = await supabase.auth.signUp({
            email: tempEmail,
            password,
            options: {
              data: {
                name: name || email,
                original_input: email, // 원래 입력 저장
              },
            },
          });

          if (!retryError) {
            // 성공 시 바로 로그인
            await supabase.auth.signInWithPassword({
              email: tempEmail,
              password,
            });
            return { success: true };
          }
        } catch (retryError) {
          console.error("회원가입 재시도 오류:", retryError);
        }
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "회원가입 처리 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 로그인 함수
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   */
  login: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      // 기본 로그인 시도
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // 느슨한 인증 정책: 이메일 형식이 아닌 경우 처리
        if (error.message.includes("Invalid login credentials")) {
          // 변환된 이메일 형식으로 시도
          const tempEmail = `${email.replace(/[^a-zA-Z0-9]/g, "")}@temp.com`;
          const { data: retryData, error: retryError } =
            await supabase.auth.signInWithPassword({
              email: tempEmail,
              password,
            });

          if (!retryError && retryData.user) {
            const user: User = {
              id: retryData.user.id,
              email: retryData.user.email || tempEmail,
              name:
                retryData.user.user_metadata.name || tempEmail.split("@")[0],
              profileImage: retryData.user.user_metadata.profile_image,
              createdAt: retryData.user.created_at,
            };
            return { success: true, user };
          }

          // 그래도 실패하면 오류 발생
          throw new Error("로그인에 실패했습니다.");
        }
        throw error;
      }

      if (!data.user) throw new Error("사용자 정보를 찾을 수 없습니다.");

      // 사용자 정보 형식 변환
      const user: User = {
        id: data.user.id,
        email: data.user.email || "",
        name:
          data.user.user_metadata.name || data.user.email?.split("@")[0] || "",
        profileImage: data.user.user_metadata.profile_image,
        createdAt: data.user.created_at,
      };

      return { success: true, user };
    } catch (error: unknown) {
      console.error("로그인 오류:", error);

      // 느슨한 인증 정책: 모든 인증 실패 시 익명 로그인 시도
      try {
        const { data: anonData, error: anonError } =
          await supabase.auth.signInAnonymously();

        if (!anonError && anonData.user) {
          // 익명 로그인 성공
          const user: User = {
            id: anonData.user.id,
            email: "guest@example.com",
            name: "게스트 사용자",
            profileImage: null,
            createdAt: anonData.user.created_at,
          };
          return { success: true, user };
        }
      } catch (anonError) {
        console.error("익명 로그인 오류:", anonError);
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "로그인 처리 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 로그아웃 함수
   */
  logout: async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error: unknown) {
      console.error("로그아웃 오류:", error);
      // 느슨한 인증: 로그아웃 오류가 발생해도 성공으로 처리
      return { success: true };
    }
  },

  /**
   * 현재 인증된 사용자 정보 조회
   */
  getCurrentUser: async (): Promise<{ user: User | null; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        // 느슨한 인증: 세션 오류 시 익명 로그인 시도
        const { data: anonData, error: anonError } =
          await supabase.auth.signInAnonymously();

        if (!anonError && anonData.user) {
          const user: User = {
            id: anonData.user.id,
            email: "guest@example.com",
            name: "게스트 사용자",
            profileImage: null,
            createdAt: anonData.user.created_at,
          };
          return { user };
        }
        throw error;
      }

      if (!data.user) return { user: null };

      const user: User = {
        id: data.user.id,
        email: data.user.email || "",
        name:
          data.user.user_metadata?.name ||
          data.user.email?.split("@")[0] ||
          "사용자",
        profileImage: data.user.user_metadata?.profile_image,
        createdAt: data.user.created_at,
      };

      return { user };
    } catch (error: unknown) {
      console.error("사용자 정보 조회 오류:", error);
      return {
        user: null,
        error:
          error instanceof Error
            ? error.message
            : "사용자 정보 조회 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 인증 여부 확인 (느슨한 정책으로 항상 인증됨으로 처리 가능)
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const { data } = await supabase.auth.getSession();
      return !!data.session;
    } catch (error) {
      console.error("인증 확인 오류:", error);
      // 느슨한 인증: 오류 발생해도 인증된 것으로 간주
      return true;
    }
  },
};

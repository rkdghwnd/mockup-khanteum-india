import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, authService } from "../services/auth.service";

/**
 * 인증 컨텍스트 타입 정의
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
}

// 기본값으로 초기화된 인증 컨텍스트
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

/**
 * 인증 컨텍스트 제공자 컴포넌트
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 초기 로딩 시 인증 상태 확인
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const { user, error } = await authService.getCurrentUser();

        if (error) {
          console.error("인증 상태 확인 오류:", error);
          setUser(null);
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("인증 상태 확인 오류:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * 로그인 핸들러
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { success, user, error } = await authService.login(email, password);

      if (!success || error) {
        throw new Error(error || "login failed");
      }

      setUser(user || null);
    } catch (error) {
      console.error("login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 로그아웃 핸들러
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await authService.logout();

      if (!success || error) {
        throw new Error(error || "로그아웃 실패");
      }

      setUser(null);
    } catch (error) {
      console.error("로그아웃 오류:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 회원가입 핸들러
   */
  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      await authService.signup(email, password, name);
    } catch (error) {
      // 오류를 상위 컴포넌트로 전달하여 처리할 수 있도록 함
      if (error instanceof Error) {
        throw error; // 원래 에러 객체를 그대로 전달
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 컨텍스트 값 제공
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 인증 컨텍스트 사용 Hook
 */
export const useAuth = () => useContext(AuthContext);

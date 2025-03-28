import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, authApi } from "../utils/cookieApi";
import { initializeStorage } from "../utils/cookieStorage";

// 인증 컨텍스트 타입
interface AuthContextType {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name?: string) => Promise<void>;
}

// 기본값 생성
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

// 인증 제공자 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기화 및 인증 상태 확인
  useEffect(() => {
    // 쿠키 스토리지 초기화
    initializeStorage();

    // 인증 상태 확인
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const { user } = await authApi.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("사용자 인증 확인 오류:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user } = await authApi.login(email, password);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  // 회원가입 함수
  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      await authApi.signup(email, password, name);
    } catch (error) {
      // 오류를 상위 컴포넌트로 전달하여 처리할 수 있도록 함
      if (error instanceof Error) {
        throw error; // 원래 에러 객체를 그대로 전달
      } else {
        throw new Error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

// 인증 컨텍스트 사용 훅
export const useAuth = () => useContext(AuthContext);

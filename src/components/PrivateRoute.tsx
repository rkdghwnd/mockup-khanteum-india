import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // 로딩 중일 때 표시할 로딩 스피너
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-105px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d04bff]"></div>
      </div>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리디렉션
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default PrivateRoute;

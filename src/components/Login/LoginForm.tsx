import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IdInputIcon from "../../icons/IdInputIcon";
import LockIcon from "../../icons/LockIcon";
import { useAuth } from "../../context/AuthContext";

type LoginFormProps = {
  formAction: ({ id, pw }: { id: string; pw: string }) => void;
};

const LoginForm = ({ formAction }: LoginFormProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 인증 컨텍스트 사용
  const { login } = useAuth();

  const formHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (idRef.current && pwRef.current) {
      const id = idRef.current.value;
      const pw = pwRef.current.value;

      // 폼 검증
      if (!id || !pw) {
        setError("Please enter your email and password.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // 인증 컨텍스트를 통한 로그인
        await login(id, pw);

        // 이전 코드와의 호환성을 위해 formAction도 호출
        formAction({ id, pw });

        // 로그인 성공 시 홈으로 이동
        navigate("/");
      } catch (err) {
        console.error("로그인 오류:", err);
        setError(
          err instanceof Error ? err.message : "Login failed. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center mt-12 w-full"
      onSubmit={formHandler}
    >
      {error && (
        <div className="w-[calc(100%-40px)] mb-4 p-2 text-red-500 text-sm bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <div className="relative w-[calc(100%-40px)] h-[38px] border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
        <input
          ref={idRef}
          placeholder="Please enter your email address"
          type="email"
          name="email"
          className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
        />
        <span className="absolute w-[40px] h-[25px] left-0 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-[1px] border-[#b7b7b7]">
          <IdInputIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div className="relative w-[calc(100%-40px)] h-[38px] mt-2 border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
        <input
          ref={pwRef}
          placeholder="Please enter your email password"
          type="password"
          name="password"
          className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
        />
        <span className="absolute w-[40px] h-[25px] left-0 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-[1px] border-[#b7b7b7]">
          <LockIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div className="flex flex-row-reverse w-[calc(100%-40px)] text-sm text-[#b7b7b7] mt-2">
        <Link to="?findId" className="inline-block">
          Find ID
        </Link>
        <span className="mx-3">|</span>
        <Link to="?findPassword" className="inline-block">
          Find Password
        </Link>
      </div>
      <div className="w-[calc(100%-40px)] flex flex-col space-y-3 mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-3xl w-full text-[#d04bff] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        <Link to="/signup">
          <button
            type="button"
            className="rounded-3xl w-full text-[#00d4c8] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

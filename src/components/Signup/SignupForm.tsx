import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

type SignupFormProps = {
  formAction: ({ id, pw }: { id: string; pw: string }) => void;
};

const SignupForm = ({ formAction }: SignupFormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pw2Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // 인증 컨텍스트 사용
  const { signup } = useAuth();

  // 이메일 포맷 검증 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (idRef.current && pwRef.current && pw2Ref.current) {
      const id = idRef.current.value;
      const pw = pwRef.current.value;
      const pw2 = pw2Ref.current.value;
      const name = nameRef.current?.value;

      // 폼 검증 초기화
      setError(null);
      setEmailError(null);

      // 필수 필드 검증
      if (!id || !pw || !pw2) {
        setError("모든 필수 항목을 입력해주세요.");
        return;
      }

      // 이메일 형식 검증
      if (!validateEmail(id)) {
        setEmailError("유효한 이메일 주소를 입력해주세요.");
        return;
      }

      // 비밀번호 일치 검증
      if (pw !== pw2) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 비밀번호 길이 검증
      if (pw.length < 6) {
        setError("비밀번호는 6자 이상이어야 합니다.");
        return;
      }

      try {
        setIsLoading(true);

        // 인증 컨텍스트를 통한 회원가입
        await signup(id, pw, name);

        // 이전 코드와의 호환성을 위해 formAction도 호출
        formAction({ id, pw });

        // 회원가입 성공 시 로그인 페이지로 이동
        toast(
          "A verification code has been sent to your email. Kindly verify your email before logging in. "
        );
        navigate("/login");
      } catch (error) {
        console.error("회원가입 오류:", error);

        // 이메일 중복 오류 처리
        if (
          error instanceof Error &&
          error.message.includes("already in use")
        ) {
          setEmailError(
            "이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요."
          );
        } else {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "회원가입에 실패했습니다. 다시 시도해주세요.";
          setError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="my-4 text-2xl">Create an account</div>
      <form
        className="flex flex-col items-center mt-12 w-full"
        onSubmit={formHandler}
      >
        {error && (
          <div className="w-[calc(100%-40px)] mb-4 p-2 text-red-500 text-sm bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div className="w-[calc(100%-40px)] text-sm my-2">Name (Optional)</div>
        <div className="relative w-[calc(100%-40px)] h-[38px] border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
          <input
            ref={nameRef}
            placeholder="Please enter your name"
            type="text"
            name="name"
            className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
          />
        </div>

        <div className="w-[calc(100%-40px)] text-sm mt-4">Email</div>
        <div className="relative w-[calc(100%-40px)] h-[38px] border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
          <input
            ref={idRef}
            placeholder="Please enter your email"
            type="email"
            name="email"
            className={`w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none ${
              emailError ? "border-red-500" : ""
            }`}
          />
        </div>
        {emailError && (
          <div className="w-[calc(100%-40px)] text-red-500 text-sm mt-1">
            {emailError}
          </div>
        )}

        <div className="w-[calc(100%-40px)] text-sm mt-4">Password</div>
        <div className="relative w-[calc(100%-40px)] h-[38px] mt-2 border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
          <input
            ref={pwRef}
            placeholder="Please enter your password"
            type="password"
            name="password"
            maxLength={20}
            className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
          />
        </div>

        <div className="flex flex-row-reverse w-[calc(100%-40px)] text-sm text-[#b7b7b7] my-2">
          4-20 characters, combination of letters, numbers, and special
          characters
        </div>

        <div className="relative w-[calc(100%-40px)] h-[38px] mt-2 border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
          <input
            ref={pw2Ref}
            placeholder="Please re-enter your password"
            type="password"
            name="confirmPassword"
            maxLength={20}
            className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
          />
        </div>
        <div className="w-[calc(100%-40px)] flex flex-col space-y-2 mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 accent-[#00d4c8]" />
            <span className="text-sm">
              I agree to the terms of usage of this app.
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 accent-[#00d4c8]" />
            <span className="text-sm">
              I am of legal age (18 years or older).
            </span>
          </label>
        </div>

        <div className="w-[calc(100%-40px)] flex flex-col space-y-3 mt-8">
          <Link to="/login">
            <button
              type="button"
              className="rounded-3xl w-full text-[#d04bff] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-3xl w-full text-[#00d4c8] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;

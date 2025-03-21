import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type SignupFormProps = {
  formAction: ({ id, pw }: { id: string; pw: string }) => void;
};

const SignupForm = ({ formAction }: SignupFormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pw2Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // 인증 컨텍스트 사용
  const { signup } = useAuth();

  const formHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (idRef.current && pwRef.current && pw2Ref.current) {
      const id = idRef.current.value;
      const pw = pwRef.current.value;
      const pw2 = pw2Ref.current.value;
      const name = nameRef.current?.value;

      // 폼 검증
      if (!id || !pw || !pw2) {
        setError("Please fill in all required fields.");
        return;
      }

      if (pw !== pw2) {
        setError("Passwords do not match.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // 인증 컨텍스트를 통한 회원가입
        await signup(id, pw, name);

        // 이전 코드와의 호환성을 위해 formAction도 호출
        formAction({ id, pw });

        // 회원가입 성공 시 로그인 페이지로 이동
        navigate("/login");
      } catch (error) {
        console.error("회원가입 오류:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.";
        setError(errorMessage);
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
            className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
          />
        </div>

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

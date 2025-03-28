import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { authService } from "../../services/auth.service";

type SignupFormProps = {
  formAction: ({ id, pw }: { id: string; pw: string }) => void;
};

const SignupForm = ({ formAction }: SignupFormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pw2Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Authentication context
  const { signup } = useAuth();

  // Email format validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Email duplication check function
  const checkEmailExists = async (email: string): Promise<boolean> => {
    if (!email || !validateEmail(email)) return false;

    setIsCheckingEmail(true);
    try {
      const { exists, error } = await authService.checkEmailExists(email);
      if (error) {
        console.error("Email verification error:", error);
        return false;
      }

      if (exists) {
        setEmailError(
          "This email is already in use. Please use a different email."
        );
        return true;
      }

      setEmailError(null);
      return false;
    } catch (error) {
      console.error("Email verification error:", error);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Check for duplicate email when focus leaves the email input
  const handleEmailBlur = async () => {
    if (idRef.current?.value) {
      await checkEmailExists(idRef.current.value);
    }
  };

  const formHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (idRef.current && pwRef.current && pw2Ref.current) {
      const id = idRef.current.value;
      const pw = pwRef.current.value;
      const pw2 = pw2Ref.current.value;
      const name = nameRef.current?.value;

      // Form validation initialization
      setError(null);
      setEmailError(null);

      // Required fields validation
      if (!id || !pw || !pw2) {
        setError("Please fill in all required fields.");
        return;
      }

      // Email format validation
      if (!validateEmail(id)) {
        setEmailError("Please enter a valid email address.");
        return;
      }

      // Email duplication check
      const emailExists = await checkEmailExists(id);
      if (emailExists) {
        return;
      }

      // Password match validation
      if (pw !== pw2) {
        setError("Passwords do not match.");
        return;
      }

      // Password length validation
      if (pw.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      try {
        setIsLoading(true);

        // Sign up through authentication context
        await signup(id, pw, name);

        // Call formAction for compatibility with previous code
        formAction({ id, pw });

        // Display success toast message
        toast.success(
          "A verification code has been sent to your email. Kindly verify your email before logging in.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        navigate("/login");
      } catch (error) {
        console.error("Sign up error:", error);

        // Email duplication error handling
        if (
          error instanceof Error &&
          error.message.includes("already in use")
        ) {
          setEmailError(
            "This email is already in use. Please use a different email."
          );
        } else {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Sign up failed. Please try again.";
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
            onBlur={handleEmailBlur}
            className={`w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none ${
              emailError ? "border-red-500" : ""
            }`}
          />
        </div>
        {isCheckingEmail && (
          <div className="w-[calc(100%-40px)] text-gray-500 text-sm mt-1">
            Checking email...
          </div>
        )}
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
            disabled={isLoading || isCheckingEmail || !!emailError}
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

import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import IdInputIcon from "../../icons/IdInputIcon";
import LockIcon from "../../icons/LockIcon";

type LoginFormProps = {
  formAction: ({ id, pw }: { id: string; pw: string }) => void;
};

const LoginForm = ({ formAction }: LoginFormProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    if (idRef.current && pwRef.current) {
      const id = idRef.current.value;
      const pw = pwRef.current.value;
      formAction({ id, pw });
    }
  };

  return (
    <form className="flex flex-col items-center mt-12 w-full" onSubmit={formHandler}>
      <div className="relative w-[calc(100%-40px)] h-[38px]  border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
        <input
          ref={idRef}
          placeholder="Please enter your email address"
          type="text"
          name=""
          id=""
          className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
        />
        <span className="absolute w-[40px] h-[25px] left-0 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-[1px]  border-[#b7b7b7]">
          <IdInputIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div className=" relative w-[calc(100%-40px)] h-[38px] mt-2 border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
        <input
          ref={pwRef}
          placeholder="Please enter your email password"
          type="text"
          name=""
          id=""
          className="w-full  h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
        />
        <span className="absolute w-[40px] h-[25px] left-0 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-[1px]  border-[#b7b7b7]">
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
          className="rounded-3xl w-full text-[#d04bff] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r "
        >
          Log In
        </button>
        <button
          type="button"
          className="rounded-3xl w-full text-[#00d4c8] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r"
        >
          Join the Membership
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

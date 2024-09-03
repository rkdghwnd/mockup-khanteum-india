import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";

type SignupFormProps = {
  formAction: ({ id, pw }: { id: string; pw: string }) => void;
};

const SignupForm = ({ formAction }: SignupFormProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const verifyIdRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pw2Ref = useRef<HTMLInputElement>(null);

  const sendRef = useRef<HTMLButtonElement>(null);
  const verifyDoneRef = useRef<HTMLButtonElement>(null);

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    if (idRef.current && pwRef.current) {
      const id = idRef.current.value;
      const pw = pwRef.current.value;
      formAction({ id, pw });
    }
  };

  const [showInput, setShowInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const showVerifyInput = () => setShowInput(true);
  const showPassInput = () => setShowPasswordInput(true);

  return (
    <>
      <div className="my-4 text-2xl">Create an account</div>
      <form className="flex flex-col items-center mt-12 w-full" onSubmit={formHandler}>
        <div className="w-[calc(100%-40px)] text-sm my-2">
            Email
        </div>
        <div className="relative w-[calc(100%-40px)] h-[38px]  border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
          <input
            ref={idRef}
            placeholder="Please enter your email address"
            type="text"
            name=""
            id=""
            className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
          />
          <span className="absolute w-[50px] h-[25px] right-0 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-[1px]  border-[#b7b7b7]">
            <button className="w-[50px] h-[20px] mr-2 text-xs bg-[#b7b7b7] text-white rounded-xl" ref={sendRef} onClick={showVerifyInput}>전송</button>
          </span>
        </div>
        { showInput ?
          (<div className="relative w-[calc(100%-40px)] h-[38px]  border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden mt-2">
            <input
              ref={verifyIdRef}
              placeholder="Enter 6-digit authentication number"
              type="text"
              name=""
              id=""
              maxLength={6}
              className="w-full h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
            />
            <span className="absolute w-[50px] h-[25px] right-0 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-[1px]  border-[#b7b7b7]">
              <button className="w-[50px] h-[20px] mr-2 text-xs bg-[#b7b7b7] text-white rounded-xl" ref={verifyDoneRef} onClick={showPassInput}>인증</button>
            </span>
          </div>) : <div></div>
        }
        
        
        { 
          showPasswordInput ? 
          <>
            <div className="w-[calc(100%-40px)] text-sm mt-4">
              Password
            </div>
            <div className=" relative w-[calc(100%-40px)] h-[38px] mt-2 border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
              <input
                ref={pwRef}
                placeholder="Please enter your password"
                type="password"
                name=""
                id=""
                maxLength={20}
                className="w-full  h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
              />
            </div>

            <div className="flex flex-row-reverse w-[calc(100%-40px)] text-sm text-[#b7b7b7] my-2">
              8-20-digits of English, number, and special character combinations
            </div>

            <div className=" relative w-[calc(100%-40px)] h-[38px] mt-2 border-[0.5px] border-[#b7b7b7] rounded-3xl overflow-hidden">
              <input
                ref={pw2Ref}
                placeholder="Please re-enter your password"
                type="password"
                name=""
                id=""
                maxLength={20}
                className="w-full  h-full shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] pl-12 pr-2 outline-none"
              />
            </div>
          </> : <div></div>
        }
        <div className="w-[calc(100%-40px)] flex flex-col space-y-3 mt-8">
        <Link to="/">
          <button
            type="button"
            className="rounded-3xl w-full text-[#d04bff] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r "
          >
            Cancel
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            className="rounded-3xl w-full text-[#00d4c8] bg-white shadow-xl h-[35px] hover:from-white hover:to-[#c0c5df] to-100% hover:bg-gradient-to-r"
          >
            Sign up
          </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignupForm;

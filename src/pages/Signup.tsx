import SignupForm from "../components/Signup/SignupForm";

const Signup = () => {
  const SignupHandle = ({ id, pw }: { id: string; pw: string }) => {
    console.log(id, pw);
  };
  return (
    <section className="bg-[url('bg_pc.jpg')] h-[calc(100vh-105px)] overflow-hidden flex flex-col items-center justify-center">
      <img src="logo.png" className="w-[56px] h-[56px]" />
      <SignupForm formAction={SignupHandle}/>
    </section>
  )
};

export default Signup;

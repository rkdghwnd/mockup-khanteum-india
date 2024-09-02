import { useNavigate } from "react-router-dom";
import PushProfil from "../components/push/PushProfil";
import PushInput from "../components/push/PushInput";
import { FormEvent } from "react";
import PushNotice from "../components/push/PushNotice";

const Push = () => {
  const navigate = useNavigate();

  const historyBack = () => navigate(-1);

  // 개발하다가 React19로 나오면 formAction을 이용하고 아니면 여기서 Ref를 전달해서 PushInput 안에서 추가 시키는 것으로 해도 됨
  // form 태그를 삭제하고 CSS 살짝 맞춘뒤 Push 버튼의 type="submit"삭제후 onclick에 함수 할당
  // 여기서 state나 Ref로 데이터 받을 방법을 만들어서 PushInput onChangeHandler안에 넣으면 됨
  // 이때 pushInput이 2개니 타입스크립트랑 에러처리
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className=" relative min-h-[calc(100vh-105px)] bg-[url('bg_pc.jpg')] overflow-hidden flex flex-col items-center box-border px-7">
      <h1 className="mt-3 font-bold text-xl">Push</h1>
      <button className="absolute top-2 left-2 font-bold text-2xl" onClick={historyBack}>
        {"<"}
      </button>
      <PushProfil />
      <div className="w-full text-right my-7">
        <button className="w-[75px] h-[35px] text-sm rounded-2xl bg-[#464646] text-white pb-1">Charging</button>
      </div>
      <form onSubmit={submitHandler} className="w-full">
        <PushInput label="Available push" className="mb-3" defaultValue={0} />
        <PushInput label="Push" placeholder="Starting from 1,000" />
        <div className="w-full my-4 text-right">
          {/* 전액 버튼 함수 추가 */}
          <button type="button" className="w-[53px] h-[27px] rounded-2xl border border-solid border-[#464646] shadow-[0px_2px_6px_rgba(0,0,0,0.18)]">
            Full
          </button>
        </div>
        <div className="w-full flex justify-between mt-14">
          <button
            type="button"
            onClick={historyBack}
            className="w-2/4 h-[40px] mr-3 bg-white border border-solid rounded-[20px] border-[#b7b7b7] shadow-[0px_2px_6px_rgba(0,0,0,0.18)]"
          >
            Cancel
          </button>
          <button type="submit" className="w-2/4 h-[40px] text-white bg-[#d04bff] rounded-[20px] shadow-[0px_2px_6px_rgba(0,0,0,0.18)]">
            Push
          </button>
        </div>
      </form>
      <PushNotice />
    </section>
  );
};

export default Push;

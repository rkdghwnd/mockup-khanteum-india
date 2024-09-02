import { useState } from "react";
import Dropdown from "../Dropdown";
import { SEARCHDUMMY } from "../../utils/DUMMY";
import { Link } from "react-router-dom";

const LIST = {
  year: ["2024", "2023", "2022", "2021"],
  order: ["By push order", "By follower count", "By recent activity"],
};

const SearchList = () => {
  // order에 맞춰서 list를 sorting해주면 됨
  const [order, setOrder] = useState({
    sort: "",
    year: "",
  });
  //드롭다운으로 바뀌는 sorting조건을 받기 위한 함수
  const changeOrder = (id: string, data: string) => setOrder((prev) => ({ ...prev, [id]: data }));

  return (
    <div>
      <div className=" h-[45px] text-right mt-5">
        <Dropdown selectList={LIST.year} defaultValue={LIST.year[0]} id="sort" onChange={changeOrder} className="mr-3 " />
        <Dropdown selectList={LIST.order} defaultValue={LIST.order[0]} id="year" onChange={changeOrder} className="w-[120px]" />
      </div>
      <div className="w-full shadow-[0px_2px_6px_rgba(0,0,0,0.18)] rounded-sm">
        {SEARCHDUMMY.map(({ profile, push, user }) => (
          <Link to={`/profile?user=${user}`}>
            <div className="h-[66px] w-full flex justify-between border-b-[1px] border-solid border-[#c1c1c199]">
              <div className="flex items-center p-4">
                <img src={profile} className="w-[36px] h-[36px] rounded-full" />
                <span className="ml-2 font-semibold text-sm">{user}</span>
              </div>
              <div className="flex items-center text-sm font-semibold p-4">
                <p>{push.toLocaleString()}</p>
                <span className="ml-2">push</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchList;

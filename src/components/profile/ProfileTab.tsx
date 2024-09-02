import { Dispatch, SetStateAction } from "react";
import ProfileFollowIcon from "../../icons/ProfileFollowIcon";
import ProfileVideoIcon from "../../icons/ProfileVideoIcon";
import ProfileVoteIcon from "../../icons/ProfileVoteIcon";
import RankingIcon from "../../icons/RankingIcon";
import { cn } from "../../utils/util";

//프로필 탭과 검색 탭이 동일해서 둘이 공유 하는 컴포넌트로 변경해도 좋을 것 같습니다

type ProfileTabProps = { currentTab: number; setTab: Dispatch<SetStateAction<number>> };

const ProfileTab = ({ currentTab, setTab }: ProfileTabProps) => {
  // 탭 바꾸는 함수
  const tabChange = (idx: number) => {
    if (currentTab === idx) return;
    setTab(idx);
  };
  return (
    <div className="h-[50px] border-b-2 border-solid border-[#e2e2e2] flex mt-10">
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 0 })}
      >
        <button onClick={() => tabChange(0)}>
          <ProfileVideoIcon />
        </button>
      </div>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 1 })}
      >
        <button onClick={() => tabChange(1)}>
          <ProfileFollowIcon />
        </button>
      </div>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 2 })}
      >
        <button onClick={() => tabChange(2)}>
          <ProfileVoteIcon />
        </button>
      </div>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 3 })}
      >
        <button onClick={() => tabChange(3)}>
          <RankingIcon className="w-[27px] h-[20px]" fillColor="#6B6B6B" />
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;

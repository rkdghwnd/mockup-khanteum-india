import { useState } from "react";
import FacebookIcon from "../../icons/FacebookIcon";
import InstaIcon from "../../icons/InstaIcon";
import PencilIcon from "../../icons/PencilIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import SettingIcon from "../../icons/SettingIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import { FOLLOWERS } from "../../utils/DUMMY";
import { authApi } from "../../utils/cookieApi";

type UserProps = {
  name: string;
  email: string;
  followers: number;
  push: number;
  views: number;
  userId: string;
};

// 비밀번호 변경 모달 컴포넌트
const PasswordChangeModal = ({ onClose }: { onClose: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 기본적인 유효성 검사
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword.length < 6) {
      setError("새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsLoading(true);
      // 비밀번호 변경 API 호출
      await authApi.changePassword(currentPassword, newPassword);
      setSuccess(true);

      // 3초 후 모달 닫기
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">비밀번호 변경</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            &times;
          </button>
        </div>

        {success ? (
          <div className="text-green-500 py-4 text-center">
            비밀번호가 성공적으로 변경되었습니다!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-2 text-red-500 text-sm bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm mb-1">현재 비밀번호</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                6자 이상의 비밀번호를 입력하세요.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">새 비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-500 mr-2"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-[#00d4c8] text-white rounded-md disabled:opacity-50"
              >
                {isLoading ? "처리 중..." : "변경하기"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// 프로필 설정 모달 컴포넌트
const ProfileSettingsModal = ({ onClose }: { onClose: () => void }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">프로필 설정</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">
              &times;
            </button>
          </div>

          <div className="space-y-4">
            <button
              className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-50"
              onClick={() => setShowPasswordModal(true)}
            >
              비밀번호 변경
            </button>

            <button className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-50">
              프로필 사진 변경
            </button>

            <button className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-50 text-red-500">
              계정 삭제
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordChangeModal onClose={() => setShowPasswordModal(false)} />
      )}
    </>
  );
};

const User = ({ name, email, followers, push, views, userId }: UserProps) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <div className="flex w-full items-center justify-center mt-3 min-h-[150px]">
      <div className=" w-4/5 min-w-[320px] h-full flex items-center flex-col">
        <div className="flex w-full items-center justify-center">
          <div className="w-[81px] h-full rounded-full overflow-hidden mr-3">
            <ProfileIcon className="w-full h-full" />
          </div>
          <div className="h-full">
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{name} </span>{" "}
              {/* <button className="" onClick={() => setShowSettingsModal(true)}>
                <SettingIcon />
              </button> */}
            </div>
            <div className="relative">
              <span className="text-[#245aab] text-sm">{email}</span>{" "}
              {/* <button className="absolute top-1/2 -translate-y-1/2 -right-8 w-[16px] h-[16px]">
                <PencilIcon className="w-full h-full" />
              </button> */}
            </div>
            <div className="w-full flex space-x-4 mt-2">
              <FacebookIcon />
              <InstaIcon />
              <YoutubeIcon />
            </div>
          </div>
        </div>
        <div className="w-full  flex justify-evenly mt-5">
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">{followers}</span>
            <p className="text-center">Follwers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">{push}</span>
            <p className="text-center">
              Total
              <span className="md:inline hidden"> Accumulation</span> Push
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">{views}</span>
            <p className="text-center">View Count</p>
          </div>
        </div>
        <div className="flex -space-x-2 mt-2">
          {FOLLOWERS.map((avatar, idx, arr) => (
            <div
              key={idx}
              style={{ zIndex: arr.length - idx }}
              className="w-[30px] h-[30px] rounded-full overflow-hidden"
            >
              <img src={avatar} className="w-full h-full" alt="follower" />
            </div>
          ))}
          <span className="w-[30px] h-[30px] flex items-center justify-center space-x-[2px] rounded-full overflow-hidden drop-shadow-[2px_1px_4px_rgba(0,0,0,0.25)] bg-[#707070] border-2 border-white border-solid">
            <span className="w-[3.5px] h-[3.5px] bg-white rounded-full"></span>
            <span className="w-[3.5px] h-[3.5px] bg-white rounded-full"></span>
            <span className="w-[3.5px] h-[3.5px] bg-white rounded-full"></span>
          </span>
        </div>
      </div>

      {showSettingsModal && (
        <ProfileSettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  );
};

export default User;

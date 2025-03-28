import { useEffect, useState } from "react";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileTab from "../components/profile/ProfileTab";
import User from "../components/profile/User";
import { Video, videoApi } from "../utils/cookieApi";
import { useAuth } from "../context/AuthContext";
import VideoList from "../components/Home/VideoList";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Profile = () => {
  // 현재 무슨 탭인지 저장 상태
  const [currentTab, setCurrentTab] = useState(0);
  const [myVideos, setMyVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 가져오기
  const { user, isAuthenticated } = useAuth();

  // 내 동영상 가져오기
  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        setIsLoading(true);
        const { videos } = await videoApi.getMyVideos();
        setMyVideos(videos);
      } catch (error) {
        console.error("내 동영상 로딩 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMyVideos();
    }
  }, [isAuthenticated]);

  // 동영상을 카테고리별로 그룹화하는 함수
  const groupVideosByCategory = (videos: Video[]) => {
    const grouped: Record<string, Video[]> = {};

    videos.forEach((video) => {
      if (!grouped[video.category]) {
        grouped[video.category] = [];
      }
      grouped[video.category].push(video);
    });

    return grouped;
  };

  // 동영상 삭제 처리 함수
  const handleDeleteVideo = async (videoId: string) => {
    try {
      // 비디오 삭제 API 호출
      await videoApi.deleteVideo(videoId);

      // 로컬 상태 업데이트
      setMyVideos((prev) => prev.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("동영상 삭제 오류:", error);
      // 오류 메시지 표시 로직 추가 가능
    }
  };

  // 로그인하지 않은 경우 로그인 안내 메시지 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-105px)] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          프로필을 보려면 로그인이 필요합니다
        </h1>
        <Link
          to="/login"
          className="px-6 py-2 bg-[#00d4c8] text-white rounded-full"
        >
          로그인 하기
        </Link>
      </div>
    );
  }

  // 사용자의 동영상을 카테고리별로 그룹화
  const groupedVideos = groupVideosByCategory(myVideos);

  return (
    <section className="min-h-[calc(100vh-105px)]">
      <ProfileBanner />
      {user && (
        <User
          name={user.name || "사용자"}
          email={user.email}
          followers={0} // 추후 팔로워 기능 구현 시 변경
          push={0} // 추후 푸시 기능 구현 시 변경
          views={0} // 추후 조회수 기능 구현 시 변경
          userId={user.id}
        />
      )}
      <ProfileTab currentTab={currentTab} setTab={setCurrentTab} />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      ) : myVideos.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-lg text-gray-500 mb-4">
            아직 업로드한 동영상이 없습니다.
          </p>
          <Link
            to="/upload"
            className="px-6 py-2 bg-[#00d4c8] text-white rounded-full"
          >
            첫 동영상 업로드 하기
          </Link>
        </div>
      ) : (
        // 카테고리별로 동영상 표시
        Object.entries(groupedVideos).map(([category, videos]) => (
          <VideoList
            key={category}
            title={category}
            video={videos}
            isProfile
            onDelete={handleDeleteVideo}
          />
        ))
      )}
    </section>
  );
};

export default Profile;

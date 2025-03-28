import { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import DreamerRanking from "../components/Home/DreamerRanking";
import VideoList from "../components/Home/VideoList";
import { CATEGORY } from "../utils/DUMMY";
import { Video, videoService } from "../services/video.service";

const Home = () => {
  const [videos, setVideos] = useState<{ [category: string]: Video[] }>({});
  const [categories] = useState<string[]>(CATEGORY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 카테고리는 DUMMY 데이터에서 가져옴
        // 실제로는 Supabase에서 가져올 수 있도록 서비스를 확장할 수 있음

        // 모든 비디오를 가져온 다음 카테고리별로 분류
        const { videos: allVideos, error: videoError } =
          await videoService.getAllVideos();

        if (videoError) {
          throw new Error(videoError);
        }

        const videosByCategory: { [category: string]: Video[] } = {};

        // 카테고리별로 비디오 분류
        categories.forEach((category) => {
          videosByCategory[category] = allVideos.filter(
            (video) => video.category === category
          );
        });

        // 별도로 "Official" 카테고리 추가
        videosByCategory["Official"] = allVideos.slice(0, 6);

        setVideos(videosByCategory);
      } catch (err) {
        console.error("비디오 목록 가져오기 오류:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load video list."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [categories]);

  return (
    <div className="w-full h-full">
      <Banner />
      <DreamerRanking />

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500">Loading videos...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <VideoList
            title="Official Video"
            video={mapVideosToVideoList(videos["Official"] || [])}
            className="mt-3"
          />
          {categories.map((category) => (
            <VideoList
              key={category}
              title={category}
              video={mapVideosToVideoList(videos[category] || [])}
              className="mt-3"
            />
          ))}
        </>
      )}
    </div>
  );
};

// 비디오 객체를 VideoList 컴포넌트에 맞는 형식으로 매핑
const mapVideosToVideoList = (videos: Video[]) => {
  return videos.map((video) => ({
    thumbnail: video.thumbnail,
    videoSrc: video.videoSrc,
    id: video.id,
  }));
};

export default Home;

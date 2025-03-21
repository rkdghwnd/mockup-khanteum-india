import { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import DreamerRanking from "../components/Home/DreamerRanking";
import VideoList from "../components/Home/VideoList";
import { VIDEODUMMY, CATEGORY } from "../utils/DUMMY";
import { Video, videoApi, categoryApi } from "../utils/cookieApi";

const Home = () => {
  const [videos, setVideos] = useState<{ [category: string]: Video[] }>({});
  const [categories, setCategories] = useState<string[]>(CATEGORY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 카테고리 목록 가져오기
        const categoriesResponse = await categoryApi.getCategories();
        setCategories(categoriesResponse.categories);

        // 모든 비디오를 가져온 다음 카테고리별로 분류
        const allVideosResponse = await videoApi.getAllVideos();
        const videosByCategory: { [category: string]: Video[] } = {};

        // 카테고리별로 비디오 분류
        categoriesResponse.categories.forEach((category) => {
          videosByCategory[category] = allVideosResponse.videos.filter(
            (video) => video.category === category
          );
        });

        // 별도로 "All" 카테고리 추가
        videosByCategory["Official"] = allVideosResponse.videos.slice(0, 6);

        setVideos(videosByCategory);
      } catch (err) {
        console.error("비디오 목록 가져오기 오류:", err);
        setError("Failed to load video list.");

        // 에러 발생 시 더미 데이터 사용
        setVideos(transformDummyData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // 더미 데이터를 변환하는 헬퍼 함수
  const transformDummyData = () => {
    const result: { [category: string]: Video[] } = {};

    Object.entries(VIDEODUMMY).forEach(([category, videos]) => {
      result[
        category === "official"
          ? "Official"
          : category.charAt(0).toUpperCase() + category.slice(1)
      ] = videos.map((video, index) => ({
        id: `dummy-${category}-${index}`,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Video ${
          index + 1
        }`,
        description: `This is a dummy ${category} video ${index + 1}`,
        category: category,
        userId: "dummy-user",
        userName: "Dummy User",
        videoSrc: video.videoSrc,
        thumbnail: video.thumbnail,
        copyright: "All Rights Reserved",
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 100),
        createdAt: new Date().toISOString(),
      }));
    });

    return result;
  };

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

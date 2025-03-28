import { useEffect, useState } from "react";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileTab from "../components/profile/ProfileTab";
import User from "../components/profile/User";
import { useAuth } from "../context/AuthContext";
import VideoList from "../components/Home/VideoList";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Video, videoService } from "../services/video.service";

const Profile = () => {
  // State to store current tab
  const [currentTab, setCurrentTab] = useState(0);
  const [myVideos, setMyVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get user information
  const { user, isAuthenticated } = useAuth();

  // Fetch my videos
  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        setIsLoading(true);
        const { videos } = await videoService.getMyVideos();
        setMyVideos(videos);
      } catch (error) {
        console.error("Error loading my videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMyVideos();
    }
  }, [isAuthenticated]);

  // Function to group videos by category
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

  // Function to handle video deletion
  const handleDeleteVideo = async (videoId: string) => {
    try {
      // Call video deletion API
      const { success, error } = await videoService.deleteVideo(videoId);

      if (!success) {
        throw new Error(error);
      }

      // Update local state
      setMyVideos((prev) => prev.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
      // Logic to display error message can be added here
    }
  };

  // Display login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-105px)] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          Login required to view profile
        </h1>
        <Link
          to="/login"
          className="px-6 py-2 bg-[#00d4c8] text-white rounded-full"
        >
          Login
        </Link>
      </div>
    );
  }

  // Group user's videos by category
  const groupedVideos = groupVideosByCategory(myVideos);

  return (
    <section className="min-h-[calc(100vh-105px)]">
      <ProfileBanner />
      {user && (
        <User
          name={user.name || "User"}
          email={user.email}
          followers={0} // Will be updated when follower feature is implemented
          push={0} // Will be updated when push feature is implemented
          views={0} // Will be updated when view count feature is implemented
          // userId={user.id}
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
            You haven't uploaded any videos yet.
          </p>
          <Link
            to="/upload"
            className="px-6 py-2 bg-[#00d4c8] text-white rounded-full"
          >
            Upload your first video
          </Link>
        </div>
      ) : (
        // Display videos by category
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

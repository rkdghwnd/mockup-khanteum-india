import Banner from "../components/Home/Banner";
import DreamerRanking from "../components/Home/DreamerRanking";
import VideoList from "../components/Home/VideoList";
import { VIDEODUMMY } from "../utils/DUMMY";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Banner />
      <DreamerRanking />
      <VideoList title="Ofiicial Video" video={VIDEODUMMY.official} className="mt-3" />
      <VideoList title="Music" video={VIDEODUMMY.music} className="mt-3" />
      <VideoList title="Dance" video={VIDEODUMMY.dance} className="mt-3" />
      <VideoList title="Fashion" video={VIDEODUMMY.fashion} className="mt-3" />
      <VideoList title="Sports" video={VIDEODUMMY.sports} className="mt-3" />
      <VideoList title="Art" video={VIDEODUMMY.art} className="mt-3" />
      <VideoList title="Cooking" video={VIDEODUMMY.cooking} className="mt-3" />
      <VideoList title="Beauty" video={VIDEODUMMY.beauty} className="mt-3" />
    </div>
  );
};

export default Home;

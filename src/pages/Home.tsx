import Banner from "../components/Home/Banner";
import DreamerRanking from "../components/Home/DreamerRanking";
import VideoList from "../components/Home/VideoList";
import { VIDOEDUMMY } from "../utils/DUMMY";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Banner />
      <DreamerRanking />
      <VideoList title="Ofiicial Video" videoSrc={VIDOEDUMMY.official} className="mt-3" />
      <VideoList title="Music" videoSrc={VIDOEDUMMY.music} className="mt-3" />
      <VideoList title="Dance" videoSrc={VIDOEDUMMY.dance} className="mt-3" />
      <VideoList title="Fashion" videoSrc={VIDOEDUMMY.fashion} className="mt-3" />
      <VideoList title="Sports" videoSrc={VIDOEDUMMY.sports} className="mt-3" />
      <VideoList title="Art" videoSrc={VIDOEDUMMY.art} className="mt-3" />
      <VideoList title="Cooking" videoSrc={VIDOEDUMMY.cooking} className="mt-3" />
      <VideoList title="Beauty" videoSrc={VIDOEDUMMY.beauty} className="mt-3" />
    </div>
  );
};

export default Home;

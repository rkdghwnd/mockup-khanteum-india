import Banner from "../components/Home/Banner";
import DreamerRanking from "../components/Home/DreamerRanking";
import VideoList from "../components/Home/VideoList";
const VIDOEDUMMY = {
  official: ["thumbnail/official1.png", "thumbnail/official2.png", "thumbnail/official1.png", "thumbnail/official2.png"],
  music: ["thumbnail/music1.png", "thumbnail/music2.png", "thumbnail/music1.png", "thumbnail/music2.png"],
  dance: ["thumbnail/dance1.png", "thumbnail/dance2.png", "thumbnail/dance1.png", "thumbnail/dance2.png"],
  fashion: ["thumbnail/fashion1.png", "thumbnail/fashion2.png", "thumbnail/fashion1.png", "thumbnail/fashion2.png"],
  sports: ["thumbnail/sports1.png", "thumbnail/sports2.png", "thumbnail/sports1.png", "thumbnail/sports2.png"],
  art: ["thumbnail/art1.png", "thumbnail/art2.png", "thumbnail/art1.png", "thumbnail/art2.png"],
  cooking: ["thumbnail/cooking1.png", "thumbnail/cooking2.png", "thumbnail/cooking1.png", "thumbnail/cooking2.png"],
  beauty: ["thumbnail/beauty1.png", "thumbnail/beauty2.png", "thumbnail/beauty1.png", "thumbnail/beauty2.png"],
};

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

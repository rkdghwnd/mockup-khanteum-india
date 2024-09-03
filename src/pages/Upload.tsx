import SelectCategory from "../components/upload/SelectCategory";
import UploadProfile from "../components/upload/UploadProfile";
import { CATEGORY } from "../utils/DUMMY";

const Upload = () => {
  return (
    <section className="min-h-[calc(100vh-105px)] flex flex-col items-center">
      <h1 className="text-center pt-2 font-bold text-xl text-[#464646]">Upload Video</h1>
      <div className="bg-[url('bg_pc.png')] bg-center bg-cover h-[calc(100vh-157px)] w-[calc(100%-20px)] mt-4 px-5 rounded-3xl shadow-[0px_-2px_12px_1px_rgba(2,69,149,0.25)] flex flex-col items-center">
        <UploadProfile />
        <SelectCategory selectList={CATEGORY} />
      </div>
    </section>
  );
};

export default Upload;

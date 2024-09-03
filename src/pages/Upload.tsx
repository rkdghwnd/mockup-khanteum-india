import SelectCategory from "../components/upload/SelectCategory";
import UploadContent from "../components/upload/UploadContent";
import UploadCopyright from "../components/upload/UploadCopyright";
import UploadDesc from "../components/upload/UploadDesc";
import UploadProfile from "../components/upload/UploadProfile";
import { CATEGORY } from "../utils/DUMMY";

const Upload = () => {
  return (
    <section className="min-h-[calc(100vh-105px)] flex flex-col items-center md:w-5/6 md:mx-auto">
      <h1 className="text-center pt-2 font-bold text-xl text-[#464646]">Upload Video</h1>
      <div className="bg-[url('bg_pc.png')] bg-center bg-cover min-h-[calc(100vh-150px)] pb-2 md:h-[calc(100vh-157px)] w-[calc(100%-20px)] mt-4 px-5 rounded-3xl shadow-[0px_-2px_12px_1px_rgba(2,69,149,0.25)] flex flex-col items-center">
        <UploadProfile />
        <SelectCategory selectList={CATEGORY} />
        <UploadContent />
        <UploadDesc className="mb-5" />
        <UploadCopyright />
        <div className="mt-4">
          <button className="w-[140px] h-[40px]  rounded-[20px] bg-[#464646] text-white text-base font-medium">Registration</button>
        </div>
      </div>
    </section>
  );
};

export default Upload;

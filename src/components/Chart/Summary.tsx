type SummaryProps = {
  title?: string;
  subList: string[];
  calcList: number[];
};

const Summary = ({ title, subList, calcList }: SummaryProps) => {
  return (
    <div className="relative min-h-[50px] w-[95%] mt-5">
      <div className="h-[20px] absolute -top-4 left-1/2 -translate-x-1/2 font-bold bg-white text-nowrap text-lg">
        <h2>{title}</h2>
      </div>
      <div className="h-full text-sm border-t-[1px] border-b-[1px] border-solid border-black flex justify-between p-2 py-4">
        <div className="flex flex-col font-semibold">
          {subList?.map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </div>
        <div className="flex flex-col text-right font-bold text-sm">
          {calcList?.map((val, idx) => (
            <p key={idx}>{val.toLocaleString()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;

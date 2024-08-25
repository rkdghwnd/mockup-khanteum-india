import { getDate } from "../../utils/util";

type ChartHeaderProps = {
  day: ReturnType<typeof getDate>;
};

const ChartHeader = ({ day: { date, day, month, year } }: ChartHeaderProps) => {
  return (
    <div className="  h-[84px] md:h-[105px] mt-3  flex flex-col items-center">
      <div className="p-2 h-[70px] md:h-[90px] max-w-[450px] w-full">
        <img src="slotMachine.png" className="w-full h-full" />
      </div>
      <p className="text-[12px] ml-auto mr-3 font-semibold">
        <span className="text-slate-500 font-medium">{day}</span> | {month} {date} {year}
      </p>
    </div>
  );
};

export default ChartHeader;

import { useSearchParams } from "react-router-dom";
import { cn, getDate, randomCount } from "../../utils/util";
import { useEffect } from "react";
import ChartHeader from "./ChartHeader";
import Summary from "./Summary";
import ChartRanking from "./ChartRanking";
import { CATEGORY, DUMMYRANKING } from "../../utils/DUMMY";
import CategoryList from "./CategoryList";
import Category from "./Category";
import VideoIcon from "../../icons/VideoIcon";
import HandIcon from "../../icons/HandIcon";

const IndexChart = () => {
  const [params] = useSearchParams();
  const chart = params.get("chart") === "true" ? true : false;
  const today = getDate();

  useEffect(() => {
    if (chart) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [chart]);

  return (
    <section
      className={cn(
        "fixed top-0 left-1/2 w-full max-w-[768px] overflow-y-auto z-0 bg-white h-[calc(100vh-52px)] flex flex-col items-center -translate-x-[200%] transform duration-500 opacity-0 p-3 md:p-0",
        {
          ["-translate-x-1/2  opacity-100 z-30"]: chart,
        }
      )}
    >
      <div className="h-full max-w-[450px]">
        <ChartHeader day={today} />
        <Summary title="SINCE 2018" subList={["Sales & Transfer of Rights Total", "Royalty Payment Total"]} calcList={[108535049876, 4736771806]} />
        <Summary
          title="Pushing Index Chart(India)"
          subList={[`${today.year - 1} Push Total`, "This Month Push Total", "Today's Push Total"]}
          calcList={[4593397000, 391000, 0]}
        />
        <ChartRanking rank={DUMMYRANKING.slice(0, 3)} />
        <CategoryList category={CATEGORY} />
        <Summary subList={["Royalty Payment Finances"]} calcList={[randomCount(1000000)]} />
        <div className="flex flex-wrap justify-between px-2 pb-5 mt-3">
          <Category>
            <p className="flex items-center">
              <VideoIcon className="mr-2" />
              Dreamer
            </p>
            <p>{randomCount(100000).toLocaleString()}</p>
          </Category>
          <Category className="flex justify-between items-center">
            <p className="flex items-center">
              <HandIcon className="mr-2" />
              Producer
            </p>
            <p>{randomCount(100000).toLocaleString()}</p>
          </Category>
        </div>
      </div>
    </section>
  );
};

export default IndexChart;

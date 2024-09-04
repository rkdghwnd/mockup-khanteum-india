import { useState } from "react";
import RankingTab from "../components/Ranking/RankingTab";
import RankingDreamer from "../components/Ranking/RankingDreamer";
import RankingVideo from "../components/Ranking/RankingVideo";
import RankingCategory from "../components/Ranking/RankingCategory";

const Ranking = () => {
    const [currentTab, setCurrentTab] = useState(0);
    return (
        <section className="min-h-[calc(100vh-105px)] flex-col items-center py-8 px-2 text-mg">
            <RankingTab currentTab={currentTab} setTab={setCurrentTab} className="mt-5 md:mt-10" />
            {currentTab === 0  && <RankingDreamer />} 
            {currentTab === 1  && <RankingVideo />} 
            {currentTab === 2  && <RankingCategory />} 
        </section>
    );
};

export default Ranking;
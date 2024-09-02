import { useState } from "react";
import SearchForm from "../components/search/SearchForm";
import SearchTab from "../components/search/SearchTab";
import SearchList from "../components/search/SearchList";

const Search = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <section className="min-h-[calc(100vh-105px)] flex-col items-center py-8 px-2">
      <SearchForm />
      <SearchTab currentTab={currentTab} setTab={setCurrentTab} className="mt-5 md:mt-10" />
      <SearchList />
    </section>
  );
};

export default Search;

import "./App.css";
import BottomTab from "./components/BottomTab";
import Header from "./components/Header";
import IndexChart from "./components/Chart/IndexChart";
import Router from "./router";

function App() {
  return (
    <div className=" flex justify-center items-center box-border ">
      <main className="relative max-w-[768px] w-full min-h-screen py-[52px] overflow-hidden">
        <Header />
        <Router />
        <BottomTab />
        <IndexChart />
      </main>
    </div>
  );
}

export default App;

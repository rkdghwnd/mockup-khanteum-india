import "./App.css";
import BottomTab from "./components/BottomTab";
import Header from "./components/Header";
import Router from "./router";

function App() {
  return (
    <div className="relative min-h-screen flex justify-center max-w-[768px] pt-[50px] mx-auto overflow-hidden">
      <Header />
      <Router />
      <BottomTab />
    </div>
  );
}

export default App;

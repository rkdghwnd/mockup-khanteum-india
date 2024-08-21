import "./App.css";
import BottomTab from "./components/BottomTab";
import Router from "./router";

function App() {
  return (
    <div className="min-h-screen flex justify-center max-w-[768px]">
      <Router />
      <BottomTab />
    </div>
  );
}

export default App;

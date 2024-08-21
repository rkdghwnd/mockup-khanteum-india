import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import IndexChart from "./pages/IndexChart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";

const Router = () => {
  // return <RouterProvider router={route} />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chart" element={<IndexChart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
};

export default Router;

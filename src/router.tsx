import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Video from "./pages/Video";
import MyWallet from "./components/Wallet/MyWallet";
import WalletPassword from "./components/Wallet/WalletPassword";
import Push from "./pages/Push";

const Router = () => {
  // return <RouterProvider router={route} />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myWallet" element={<MyWallet />} />
      <Route path="/walletPassword" element={<WalletPassword />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/video" element={<Video />} />
      <Route path="/push" element={<Push />} />
    </Routes>
  );
};

export default Router;

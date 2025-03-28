import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Video from "./pages/Video";
// import MyWallet from "./components/Wallet/MyWallet";
// import WalletPassword from "./components/Wallet/WalletPassword";
import Push from "./pages/Push";
import Notice from "./components/Notice/Notice";
import Notify from "./components/Notify/Notify";
// import Ranking from "./pages/Ranking";
import Favorite from "./components/Favorite/Favorite";
// import Vote from "./components/Vote/Vote";
import PrivateRoute from "./components/PrivateRoute";

const Router = () => {
  // return <RouterProvider router={route} />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/myWallet"
        element={
          <PrivateRoute>
            <MyWallet />
          </PrivateRoute>
        }
      /> */}
      {/* <Route
        path="/walletPassword"
        element={
          <PrivateRoute>
            <WalletPassword />
          </PrivateRoute>
        }
      /> */}
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        }
      />
      <Route path="/video" element={<Video />} />
      <Route
        path="/push"
        element={
          <PrivateRoute>
            <Push />
          </PrivateRoute>
        }
      />
      <Route path="/notice" element={<Notice />} />
      <Route path="/notify" element={<Notify />} />
      {/* <Route path="/chart" element={<Ranking />} /> */}
      <Route
        path="/myFavorite"
        element={
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/vote"
        element={
          <PrivateRoute>
            <Vote />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
};

export default Router;

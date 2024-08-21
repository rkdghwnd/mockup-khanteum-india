import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import IndexChart from "./pages/IndexChart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";

const Router = () => {
  const route = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/chart", element: <IndexChart /> },
    { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
    { path: "/search", element: <Search /> },
    { path: "/signup", element: <Signup /> },
    { path: "/upload", element: <Upload /> },
  ]);
  // return <RouterProvider router={route} />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/upload" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

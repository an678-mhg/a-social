import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import userState from "./stored/userState";
import postState from "./stored/postState";
import { auth } from "./config/firebase";
import PrivateRoute from "./components/PrivateRoute";
import { fetchAllPosts } from "./action/firebaseAction";
import DetailPost from "./pages/DetailPost";
import ForgotPassword from "./pages/ForgotPassword";
import useInnerWidth from "./hook/useInnerWidth";
import RoomChat from "./pages/RoomChat";

function App() {
  const { setUser } = userState((state) => state);
  const { setPosts, sort } = postState((state) => state);
  const location = useLocation();

  const width = useInnerWidth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const posts = await fetchAllPosts(sort);
        setPosts(posts);
        return;
      }

      setUser(null);
    });

    return () => {
      unsub();
    };
  }, [sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  if (width > 500)
    return (
      <div className="h-screen flex justify-center items-center">
        Devices with width greater than 500px. are not supported !
      </div>
    );

  return (
    <div className="app bg-slate-300 h-screen">
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/room/:id" element={<RoomChat />} />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;

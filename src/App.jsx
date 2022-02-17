import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import userState from "./stored/userState";
import postState from "./stored/postState";
import { auth } from "./config/firebase";
import PrivateRoute from "./components/PrivateRoute";
import { fetchAllPosts } from "./action/firebaseAction";
import DetailPost from "./pages/DetailPost";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const { setUser } = userState((state) => state);
  const { setPosts, sort } = postState((state) => state);

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
      </Routes>
    </div>
  );
}

export default App;

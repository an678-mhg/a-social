import { signOut } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import userState from "../stored/userState";
import themeStore from "../stored/themeStore";

const darkTheme = {
  bg_color: "#333",
  bg_post: "#222",
  text_color: "#fff",
};

const lightTheme = {
  bg_color: "#ECF3FF",
  bg_post: "#fff",
  text_color: "#333",
};

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);

  const curentUser = userState((state) => state.curentUser);
  const { theme, setTheme } = themeStore((state) => state);

  const logout = () => {
    signOut(auth);
  };

  const handleSetTheme = () => {
    setTheme();
    if (theme.bg_color === "#ECF3FF") {
      return localStorage.setItem("theme", JSON.stringify(darkTheme));
    }

    return localStorage.setItem("theme", JSON.stringify(lightTheme));
  };

  return (
    <div className="pt-4 pb-2 flex items-center justify-between">
      <Link
        to="/"
        className={`flex items-center`}
        style={{ color: theme.text_color }}
      >
        <i className={`text-2xl mr-2 bx bx-bug-alt`}></i> ASocial
      </Link>
      <div className="flex items-center">
        <button
          className="w-[30px] h-[30px] rounded-full mr-3 flex items-center justify-center"
          onClick={handleSetTheme}
          style={{ backgroundColor: theme.bg_post }}
        >
          <i
            class={`${
              theme.bg_color === "#333"
                ? "bx bx-sun text-[#e74c3c]"
                : "bx bx-moon text-black"
            }`}
          ></i>
        </button>
        <div
          className={`flex items-center justify-between px-1 py-1 rounded-full relative`}
          style={{ backgroundColor: theme.bg_post, color: theme.text_color }}
          onClick={() => setShowLogout(!showLogout)}
        >
          <img
            className="w-[25px] object-cover rounded-full mr-1"
            alt=""
            src={`${
              curentUser?.photoURL ||
              "https://genvita.vn/resources/avatar/1322e982-086b-44d2-ad10-87aaa3f0f0fc?width=119&height=119&mode=crop"
            }`}
          />
          <p className="text-xs">@{curentUser?.displayName}</p>
          <div
            style={{
              backgroundColor: theme.bg_post,
              color: theme.text_color,
            }}
            onClick={logout}
            className={`absolute w-full top-8 left-0 px-2 py-1 rounded-sm ${
              showLogout ? "" : "hidden"
            }`}
          >
            <p className="text-center">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

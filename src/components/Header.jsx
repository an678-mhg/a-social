import { signOut } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../config/firebase";
import userState from "../stored/userState";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);

  const curentUser = userState((state) => state.curentUser);

  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="pt-4 pb-2 flex items-center justify-between">
      <div className="flex items-center text-slate-400">
        <i className="text-2xl mr-2 text-slate-400 bx bx-bug-alt"></i> ASocial
      </div>
      <div
        className="bg-slate-400 text-white flex items-center justify-between px-1 py-1 rounded-full relative"
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
          onClick={logout}
          className={`absolute w-full top-8 left-0 px-2 py-1 bg-slate-400 rounded-sm ${
            showLogout ? "" : "hidden"
          }`}
        >
          <p className="text-white text-center">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

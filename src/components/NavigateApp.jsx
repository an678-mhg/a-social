import React from "react";
import { NavLink } from "react-router-dom";
import userState from "../stored/userState";

const NavigateApp = () => {
  const curentUser = userState((state) => state.curentUser);

  return (
    <div className="fixed left-0 right-0 w-full bottom-0 border-t-2 border-b-2 px-3 py-3 bg-slate-300 flex items-center justify-between">
      <NavLink
        activeclassname="active"
        className="text-slate-400 block flex-1 text-center"
        to="/"
      >
        <i className="text-2xl bx bx-home"></i>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-slate-400 block flex-1 text-center"
        to="/chat"
      >
        <i className="text-2xl bx bx-chat"></i>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-slate-400 block flex-1 text-center"
        to={`/profile/${curentUser.uid}`}
      >
        <i className="text-2xl bx bx-user"></i>
      </NavLink>
    </div>
  );
};

export default NavigateApp;

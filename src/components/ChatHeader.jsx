import React, { useMemo } from "react";
import { useUsersInfo } from "../hook/useUsersInfo";
import userState from "../stored/userState";
import { Link } from "react-router-dom";

const ChatHeader = ({ roomInfo }) => {
  const { users } = useUsersInfo(roomInfo?.members);

  const curentUser = userState((state) => state.curentUser);

  const userRender = users.filter((p) => p.id !== curentUser.uid);

  return (
    <div className="flex items-center justify-between py-3 fixed w-full left-0 right-0 px-3 top-0 border-b-2 bg-[#222] z-10">
      <div className="flex items-center">
        <Link to="/chat" className="mr-4 block">
          <i className="bx bx-arrow-back text-2xl text-white"></i>
        </Link>
        <div className="flex items-center">
          <img
            src={userRender[0]?.photoURL}
            className="w-[40px] rounded-full object-cover"
            alt=""
          />
          <p className="ml-4 text-white">{userRender[0]?.displayName}</p>
        </div>
      </div>
      <div>
        <i className="bx bx-info-circle text-white text-2xl"></i>
      </div>
    </div>
  );
};

export default ChatHeader;

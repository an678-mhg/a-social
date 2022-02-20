import React, { useMemo } from "react";
import { useUsersInfo } from "../hook/useUsersInfo";
import userState from "../stored/userState";
import { Link } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

const ChatHeader = ({ roomInfo }) => {
  const { users, loading, err } = useUsersInfo(roomInfo?.members);

  const curentUser = userState((state) => state.curentUser);

  const userRender = users.filter((p) => p.id !== curentUser.uid);

  if (err) return <PageNotFound />;

  return (
    <div className="flex items-center justify-between py-3 fixed w-full left-0 right-0 px-3 top-0 border-b-2 bg-[#222] z-10">
      <div className="flex items-center">
        <Link to="/chat" className="mr-4 block">
          <i className="bx bx-arrow-back text-2xl text-white"></i>
        </Link>
        <div className="flex items-center">
          <div
            className={`w-[40px] h-[40px] overflow-hidden rounded-full ${
              loading ? "skeleton" : ""
            }`}
          >
            <img
              src={userRender[0]?.photoURL}
              className="object-cover"
              alt=""
            />
          </div>

          {loading ? (
            <div className="ml-4 w-[80px]">
              <p className="skeleton skeleton-text"></p>
            </div>
          ) : (
            <p className="ml-4 text-white">{userRender[0]?.displayName}</p>
          )}
        </div>
      </div>
      <div>
        <i className="bx bx-info-circle text-white text-2xl"></i>
      </div>
    </div>
  );
};

export default ChatHeader;

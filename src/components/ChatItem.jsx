import React from "react";
import { Link } from "react-router-dom";
import { useUsersInfo } from "../hook/useUsersInfo";
import userState from "../stored/userState";

const ChatItem = ({ data }) => {
  const { users, loading } = useUsersInfo(data.members);
  const curentUser = userState((state) => state.curentUser);

  const userRender = users?.filter((p) => p.id !== curentUser.uid);

  return (
    <Link
      to={`/room/${data.id}`}
      className="flex items-center rounded-sm bg-white p-3 mb-3"
    >
      <div
        className={`w-[40px] h-[40px] ${
          loading ? "skeleton" : ""
        } rounded-full overflow-hidden`}
      >
        <img
          src={userRender[0]?.photoURL}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 w-[80%]">
        {loading ? (
          <>
            <p className="skeleton skeleton-text w-[25%]"></p>
            <p className="skeleton skeleton-text w-[80%]"></p>
          </>
        ) : (
          <>
            <p className="text-md font-semibold">
              {userRender[0]?.displayName}
            </p>
            <p className="text-sm font-medium text-gray-400 mt-2">
              {data.lastMessage && data.lastMessage.length > 30
                ? data.lastMessage.slice(0, 30) + "..."
                : data.lastMessage || "No message recently"}
            </p>
          </>
        )}
      </div>
    </Link>
  );
};

export default ChatItem;

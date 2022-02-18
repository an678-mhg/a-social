import React from "react";
import { Link } from "react-router-dom";
import { useUsersInfo } from "../hook/useUsersInfo";
import userState from "../stored/userState";

const ChatItem = ({ data }) => {
  const { users } = useUsersInfo(data.members);
  const curentUser = userState((state) => state.curentUser);

  const userRender = users?.filter((p) => p.id !== curentUser.uid);

  return (
    <Link
      to={`/room/${data.id}`}
      className="flex items-center rounded-sm bg-white p-3 mb-3"
    >
      <img
        src={userRender[0]?.photoURL}
        alt=""
        className="w-[40px] rounded-full object-cover"
      />
      <div className="ml-4">
        <p className="text-md font-semibold">{userRender[0]?.displayName}</p>
        <p className="text-sm font-medium text-gray-400 mt-2">
          {data.lastMessage || "No message recently"}
        </p>
      </div>
    </Link>
  );
};

export default ChatItem;

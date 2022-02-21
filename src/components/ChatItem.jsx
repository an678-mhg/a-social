import React from "react";
import { Link } from "react-router-dom";
import { useUsersInfo } from "../hook/useUsersInfo";
import userState from "../stored/userState";
import themeStore from "../stored/themeStore";
import PageNotFound from "../pages/PageNotFound";

const ChatItem = ({ data }) => {
  const { users, loading, err } = useUsersInfo(data?.members);
  const curentUser = userState((state) => state.curentUser);
  const theme = themeStore((state) => state.theme);

  const userRender = users?.filter((p) => p.id !== curentUser.uid);

  if (err) return <PageNotFound />;

  return (
    <Link
      to={`/room/${data.id}`}
      className="flex items-center rounded-sm p-3 mb-3"
      style={{ backgroundColor: theme.bg_post }}
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
            <p
              className="text-md font-semibold"
              style={{ color: theme.text_color }}
            >
              {userRender[0]?.displayName.length > 20
                ? userRender[0]?.displayName.slice(0, 20) + "..."
                : userRender[0]?.displayName}
            </p>
            <div className="flex items-center">
              {data.status === "new" && data.uid !== curentUser.uid ? (
                <p className="text-xs font-medium mt-2 bg-red-500 mr-2 rounded-full w-[20px] h-[20px] flex items-center justify-center text-white">
                  01
                </p>
              ) : null}
              <p
                className="text-sm font-medium mt-2"
                style={{ color: theme.text_color }}
              >
                {data.lastMessage && data.lastMessage.length > 30
                  ? data.lastMessage.slice(0, 30) + "..."
                  : data.lastMessage || "No message recently"}
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ChatItem;

import React from "react";
import themeStore from "../stored/themeStore";

const ProfileBottom = ({ profile, totalPost }) => {
  const theme = themeStore((state) => state.theme);

  return (
    <div
      className="flex px-3 pt-6 w-full justify-between items-center"
      style={{
        backgroundColor: theme.bg_post,
        color: theme.text_color,
      }}
    >
      <div className="flex items-center flex-col flex-1 ">
        <p>{profile.following && profile?.following.length}</p>
        <p>Follow</p>
      </div>
      <div className="flex items-center flex-col flex-1 ">
        <p>0</p>
        <p>Like</p>
      </div>
      <div className="flex items-center flex-col flex-1 ">
        <p>{totalPost}</p>
        <p>Post</p>
      </div>
    </div>
  );
};

export default ProfileBottom;

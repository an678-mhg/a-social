import React from "react";

const ProfileBottom = ({ profile, totalPost }) => {
  return (
    <div className="flex px-3 pt-6 w-full justify-between items-center">
      <div className="flex items-center flex-col flex-1 ">
        <p>{profile.following && profile?.following.length}</p>
        <p>following</p>
      </div>
      <div className="flex items-center flex-col flex-1 ">
        <p>{profile.follower && profile?.follower.length}</p>
        <p>follower</p>
      </div>
      <div className="flex items-center flex-col flex-1 ">
        <p>{totalPost}</p>
        <p>post</p>
      </div>
    </div>
  );
};

export default ProfileBottom;

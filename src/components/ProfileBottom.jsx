import React from "react";

const ProfileBottom = ({ profile, totalPost }) => {
  return (
    <div className="flex px-3 pt-6 w-full justify-between items-center">
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

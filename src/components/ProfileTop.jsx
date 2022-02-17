import React from "react";

const ProfileTop = ({ profile }) => {
  return (
    <div>
      <h1 className="text-center text-md text-slate-400 mb-3">
        @{profile && profile?.displayName}
      </h1>

      <div className="flex flex-col items-center justify-center">
        <img
          alt=""
          src={profile && profile?.photoURL}
          className="w-[80px] rounded-md object-cover"
        />

        <p className="my-3 text-gray-500">{profile && profile?.displayName}</p>

        <p>This is description profile person !</p>
      </div>
    </div>
  );
};

export default ProfileTop;

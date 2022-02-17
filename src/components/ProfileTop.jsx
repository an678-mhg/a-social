import React from "react";
import useStore from "../stored/userState";

const ProfileTop = ({ profile }) => {
  const currentUser = useStore((state) => state.curentUser);

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

        <div>
          {currentUser.uid === profile.id ? (
            <>
              <button className="text-md font-semibold bg-black py-2 px-6 mb-3 rounded-sm text-white">
                Edit profile
              </button>
            </>
          ) : (
            <>
              <button className="text-md font-semibold bg-slate-400 py-2 px-6 mb-3 rounded-sm">
                Follow
              </button>
              <button className="text-md font-semibold bg-black py-2 px-4 mb-3 rounded-sm text-white">
                <i className="bx bx-chat text-md"></i>
              </button>
            </>
          )}
        </div>

        <p>This is description profile person !</p>
      </div>
    </div>
  );
};

export default ProfileTop;
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../config/firebase";
import useStore from "../stored/userState";

const ProfileTop = ({ profile, setProfile, setShowModal }) => {
  const currentUser = useStore((state) => state.curentUser);

  const handleFollowUser = async () => {
    try {
      if (profile.following.some((p) => p === currentUser.uid)) {
        const newProfile = profile.following.filter(
          (p) => p !== currentUser.uid
        );

        await setDoc(doc(db, `users/${profile.id}`), {
          ...profile,
          following: newProfile,
        });

        setProfile({ ...profile, following: newProfile });
      } else {
        const newProfileFollowing = [...profile.following, currentUser.uid];
        await updateDoc(doc(db, `users/${profile.id}`), {
          following: newProfileFollowing,
        });
        setProfile({ ...profile, following: newProfileFollowing });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <button
                onClick={() => setShowModal(true)}
                className="text-md font-semibold bg-black py-2 px-6 mb-3 rounded-sm text-white"
              >
                Edit profile
              </button>
            </>
          ) : (
            <>
              <button
                className="text-md font-semibold bg-slate-400 py-2 px-6 mb-3 rounded-sm"
                onClick={handleFollowUser}
              >
                {profile.following &&
                profile.following.some((p) => p === currentUser.uid)
                  ? "Followed"
                  : "Follow"}
              </button>
              <button className="text-md font-semibold bg-black py-2 px-4 mb-3 rounded-sm text-white">
                <i className="bx bx-chat text-md"></i>
              </button>
            </>
          )}
        </div>

        <p className="text-sm px-3">
          {profile.bio || "This is description profile person !"}
        </p>
      </div>
    </div>
  );
};

export default ProfileTop;

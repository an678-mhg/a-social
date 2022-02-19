import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../config/firebase";
import useStore from "../stored/userState";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loading from "../global/Loading";
import themeStore from "../stored/themeStore";

const ProfileTop = ({ profile, setProfile, setShowModal }) => {
  const currentUser = useStore((state) => state.curentUser);
  const theme = themeStore((state) => state.theme);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateChatRooms = async (uid, userChat) => {
    setLoading(true);
    const userArray = [uid, userChat].sort();
    const q = query(collection(db, "rooms"), where("members", "==", userArray));
    const querySnap = await getDocs(q);
    if (querySnap.empty) {
      const res = await addDoc(collection(db, "rooms"), {
        members: [uid, userChat].sort(),
        lastMessage: "",
        create_at: Date.now(),
      });

      navigate(`/room/${res.id}`);
      setLoading(false);
    } else {
      navigate(`/room/${querySnap.docs[0].id}`);
      setLoading(false);
    }
  };

  const handleFollowUser = async () => {
    try {
      if (profile.following.some((p) => p === currentUser.uid)) {
        const newProfile = profile.following.filter(
          (p) => p !== currentUser.uid
        );

        setDoc(doc(db, `users/${profile.id}`), {
          ...profile,
          following: newProfile,
        });

        setProfile({ ...profile, following: newProfile });
      } else {
        const newProfileFollowing = [...profile.following, currentUser.uid];
        updateDoc(doc(db, `users/${profile.id}`), {
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
      <h1
        className="text-center text-md mb-3"
        style={{ color: theme.text_color }}
      >
        {profile && profile?.email}
      </h1>

      <div className="flex flex-col items-center justify-center">
        <img
          alt=""
          src={profile && profile?.photoURL}
          className="w-[80px] rounded-md object-cover"
        />

        <p className="my-3" style={{ color: theme.text_color }}>
          {profile && profile?.displayName}
        </p>

        <div>
          {currentUser.uid === profile.id ? (
            <>
              <button
                style={{
                  backgroundColor: theme.bg_color,
                  color: theme.text_color,
                }}
                onClick={() => setShowModal(true)}
                className="text-md font-semibold py-2 px-6 mb-3 rounded-sm"
              >
                Edit profile
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  backgroundColor: theme.bg_color,
                  color: theme.text_color,
                }}
                className="text-md font-semibold py-2 px-6 mb-3 rounded-sm"
                onClick={handleFollowUser}
              >
                {profile.following &&
                profile.following.some((p) => p === currentUser.uid)
                  ? "Followed"
                  : "Follow"}
              </button>
              <button
                style={{
                  backgroundColor: theme.bg_color,
                  color: theme.text_color,
                }}
                className="text-md font-semibold py-2 px-4 mb-3 rounded-sm ml-1 text-md"
                onClick={() =>
                  handleCreateChatRooms(currentUser.uid, profile.id)
                }
              >
                <i className="bx bx-chat text-md"></i>
              </button>
            </>
          )}
        </div>

        <p className="text-sm px-3" style={{ color: theme.text_color }}>
          {profile.bio || "This is description profile person !"}
        </p>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default ProfileTop;

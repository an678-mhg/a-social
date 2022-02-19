import React from "react";
import { collection, where, getDocs, addDoc, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import userState from "../stored/userState";

const UserItem = ({ data, setLoadingRooms }) => {
  const navigate = useNavigate();

  const currentUser = userState((state) => state.curentUser);

  const handleCreateChatRooms = async (uid, userChat) => {
    setLoadingRooms(true);
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
      setLoadingRooms(false);
    } else {
      navigate(`/room/${querySnap.docs[0].id}`);
      setLoadingRooms(false);
    }
  };

  return (
    <div
      className="mb-2 flex items-center hover:bg-slate-300 p-2 rounded-md cursor-pointer"
      onClick={() => handleCreateChatRooms(currentUser.uid, data.id)}
    >
      <img
        className="w-[40px] object-cover rounded-full"
        src={data.photoURL}
        alt=""
      />
      <p className="ml-5">{data.displayName}</p>
    </div>
  );
};

export default UserItem;

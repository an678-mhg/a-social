import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createDoc } from "../action/firebaseAction";
import LeftMess from "../components/LeftMess";
import RightMess from "../components/RightMess";
import { db } from "../config/firebase";
import useFireStore from "../hook/useFireStore";
import { useUsersInfo } from "../hook/useUsersInfo";
import userState from "../stored/userState";

const RoomChat = () => {
  const { id } = useParams();
  const [roomInfo, setRoomsInfo] = useState({});
  const curentUser = userState((state) => state.curentUser);
  const [mess, setMess] = useState("");

  useEffect(() => {
    async function getRoomInfo(id) {
      const res = await getDoc(doc(db, `rooms/${id}`));

      if (res.exists()) {
        setRoomsInfo({ ...res.data(), id: res.id });
      }
    }

    getRoomInfo(id);
  }, [id]);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!mess.trim()) return;

    createDoc("messages", {
      rooms: id,
      userId: curentUser.uid,
      create_at: Date.now(),
      content: mess,
    });

    updateDoc(doc(db, `rooms/${id}`), {
      lastMessage: mess,
    });

    setMess("");
  };

  const conditional = useMemo(
    () => ({
      fieldName: "rooms",
      operator: "==",
      compareValue: id,
    }),
    []
  );

  const { users } = useUsersInfo(roomInfo?.members, id);
  const userRender = users.filter((p) => p.id !== curentUser.uid);
  const { document } = useFireStore("messages", conditional);

  return (
    <div className="px-3 bg-[#222] h-screen">
      <div className="flex items-center justify-between py-3 fixed w-full left-0 right-0 px-3 top-0 border-b-2">
        <div className="flex items-center">
          <Link to="/chat" className="mr-4 block">
            <i className="bx bx-arrow-back text-2xl text-white"></i>
          </Link>
          <div className="flex items-center">
            <img
              src={userRender[0]?.photoURL}
              className="w-[40px] rounded-full object-cover"
              alt=""
            />
            <p className="ml-4 text-white">{userRender[0]?.displayName}</p>
          </div>
        </div>
        <div>
          <i className="text-white tbx bx-info-circle text-2xl"></i>
        </div>
      </div>

      <div className="pt-[100px] px-3">
        {document.length > 0 ? (
          document.map((p) =>
            p.userId === curentUser.uid ? (
              <RightMess key={p.id} mess={p.content} />
            ) : (
              <LeftMess key={p.id} mess={p.content} />
            )
          )
        ) : (
          <div className="w-full text-white text-center">
            No message recently
          </div>
        )}
      </div>

      <form
        onSubmit={handleAddMessage}
        className="py-3 fixed w-full left-0 right-0 px-3 bottom-0 border-t-2 flex items-center justify-between"
      >
        <button>
          <i className="bx bx-upload text-white text-2xl mr-3"></i>
        </button>
        <input
          placeholder="Message..."
          className="w-full px-2 py-1 rounded-md outline-none"
          value={mess}
          onChange={(e) => setMess(e.target.value)}
        />
        <button>
          <i className="bx bx-send text-white text-2xl ml-3"></i>
        </button>
      </form>
    </div>
  );
};

export default RoomChat;

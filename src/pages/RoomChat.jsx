import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createDoc } from "../action/firebaseAction";
import ChatHeader from "../components/ChatHeader";
import LeftMess from "../components/LeftMess";
import RightMess from "../components/RightMess";
import { db } from "../config/firebase";
import Loading from "../global/Loading";
import useFireStore from "../hook/useFireStore";
import userState from "../stored/userState";

const RoomChat = () => {
  const { id } = useParams();
  const [roomInfo, setRoomsInfo] = useState({});
  const curentUser = userState((state) => state.curentUser);
  const [mess, setMess] = useState("");
  const BottomScrollIntoView = useRef(null);

  useEffect(() => {
    async function getRoomInfo(id) {
      const res = await getDoc(doc(db, `rooms/${id}`));

      if (res.exists()) {
        setRoomsInfo({ ...res.data(), id: res.id });
      }
    }

    getRoomInfo(id);
  }, [id]);

  useEffect(() => {
    updateDoc(doc(db, `rooms/${id}`), {
      status: "old",
    });
  }, []);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!mess.trim()) return;

    createDoc("messages", {
      rooms: id,
      userId: curentUser.uid,
      create_at: serverTimestamp(),
      content: mess,
    });

    updateDoc(doc(db, `rooms/${id}`), {
      lastMessage: mess,
      status: "new",
      uid: curentUser.uid,
    });

    setMess("");

    setTimeout(() => {
      BottomScrollIntoView.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      BottomScrollIntoView.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  }, []);

  const conditional = useMemo(
    () => ({
      fieldName: "rooms",
      operator: "==",
      compareValue: id,
    }),
    []
  );

  const { document, loading } = useFireStore("messages", conditional);

  return (
    <div className="px-3 bg-[#222] h-screen overflow-auto">
      <ChatHeader roomInfo={roomInfo} />

      <div className="pt-[80px] px-3 pb-[70px]">
        {document.length > 0 ? (
          document.map((p) =>
            p.userId === curentUser.uid ? (
              <RightMess key={p.id} mess={p.content} />
            ) : (
              <LeftMess key={p.id} mess={p.content} />
            )
          )
        ) : (
          <div className="w-full text-white text-center text-sm">
            No message recently
          </div>
        )}

        <div ref={BottomScrollIntoView}></div>
      </div>

      <form
        onSubmit={handleAddMessage}
        className="py-3 fixed w-full left-0 right-0 px-3 bottom-0 border-t-2 flex items-center justify-between bg-[#222] z-10"
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

      {loading && <Loading />}
    </div>
  );
};

export default RoomChat;

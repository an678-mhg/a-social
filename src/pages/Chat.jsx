import React, { useMemo, useState } from "react";
import Title from "../components/Title";
import useFireStore from "../hook/useFireStore";
import userState from "../stored/userState";
import ChatItem from "../components/ChatItem";
import ModalUser from "../components/ModalUser";

const Chat = () => {
  const curentUser = userState((state) => state.curentUser);

  const [modal, setShowModal] = useState(false);

  const conditional = useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains",
      compareValue: curentUser.uid,
    }),
    []
  );

  const { document } = useFireStore("rooms", conditional);

  return (
    <div className="mt-5">
      <Title title={"Chat-App"} />
      {document.length === 0 ? (
        <div className="bg-white p-3 text-center">No message recently</div>
      ) : (
        document.map((p) => <ChatItem data={p} key={p.id} />)
      )}

      <div
        onClick={() => setShowModal(true)}
        className="w-[60px] h-[60px] bg-white fixed bottom-[80px] right-[10px] rounded-full flex items-center justify-center text-2xl cursor-pointer"
      >
        +
      </div>

      {modal && <ModalUser setShowModal={setShowModal} />}
    </div>
  );
};

export default Chat;

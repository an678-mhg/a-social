import React, { useMemo, useState } from "react";
import Title from "../components/Title";
import useFireStore from "../hook/useFireStore";
import userState from "../stored/userState";
import ChatItem from "../components/ChatItem";
import ModalUser from "../components/ModalUser";
import themeStore from "../stored/themeStore";

const Chat = () => {
  const curentUser = userState((state) => state.curentUser);
  const theme = themeStore((state) => state.theme);

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
        <div
          className="p-3 text-center"
          style={{ backgroundColor: theme.bg_post, color: theme.text_color }}
        >
          No message recently
        </div>
      ) : (
        document.map((p) => <ChatItem data={p} key={p.id} />)
      )}

      <div
        style={{ backgroundColor: theme.bg_post, color: theme.text_color }}
        onClick={() => setShowModal(true)}
        className="w-[50px] h-[50px] fixed bottom-[80px] right-[14px] rounded-full flex items-center justify-center  cursor-pointer"
      >
        <i className="text-2xl bx bx-plus"></i>
      </div>

      {modal && <ModalUser setShowModal={setShowModal} />}
    </div>
  );
};

export default Chat;

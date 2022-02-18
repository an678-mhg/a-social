import React, { useMemo } from "react";
import Title from "../components/Title";
import useFireStore from "../hook/useFireStore";
import userState from "../stored/userState";
import ChatItem from "./ChatItem";

const Chat = () => {
  const curentUser = userState((state) => state.curentUser);

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
      {document.map((p) => (
        <ChatItem data={p} key={p.id} />
      ))}
    </div>
  );
};

export default Chat;

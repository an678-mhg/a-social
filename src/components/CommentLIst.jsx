import React from "react";
import CommentItems from "./CommentItems";

const CommentLIst = ({ commentList }) => {
  return (
    <div className="mb-[80px] px-4">
      {commentList.map((p) => (
        <CommentItems key={p.id} p={p} />
      ))}
    </div>
  );
};

export default CommentLIst;

import React from "react";
import { calculateCreatedTime } from "../utils/formatTime";

const CommentItems = ({ p }) => {
  return (
    <div className="flex items-center bg-white p-3 rounded-md mb-4">
      <img
        alt=""
        src={p.photoURL}
        className="w-[40px] object-cover rounded-full"
      />
      <div className="ml-4 overflow-auto">
        <div className="flex items-center">
          <p className="text-sm">{p.displayName}</p>
          <p className="ml-3 text-xs text-gray-500">
            {calculateCreatedTime(p.create_at)}
          </p>
        </div>
        <p className="text-sm font-semibold mt-3">{p.content}</p>
      </div>
    </div>
  );
};

export default CommentItems;

import React from "react";

const SortPost = () => {
  return (
    <div className="w-full flex justify-end items-center">
      <button className={`mr-6 text-sm px-2 py-1 bg-slate-400 text-white`}>
        desc
      </button>
      <button className={`px-2 py-1 text-sm bg-slate-400 text-white`}>
        asc
      </button>
    </div>
  );
};

export default SortPost;

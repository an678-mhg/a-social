import React from "react";

const LeftMess = ({ mess }) => {
  return (
    <div className="w-full mb-4 justify-start flex">
      <p className="bg-white arrow-left rounded-md py-1 px-2 text-black">
        {mess}
      </p>
    </div>
  );
};

export default LeftMess;

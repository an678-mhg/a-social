import React from "react";

const LeftMess = ({ mess }) => {
  return (
    <div className="w-full mb-4">
      <p className="bg-white arrow-left rounded-md py-1 px-2 w-[45%] flex flex-wrap">
        {mess}
      </p>
    </div>
  );
};

export default LeftMess;

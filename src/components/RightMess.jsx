import React from "react";

const RightMess = ({ mess }) => {
  return (
    <div className="w-full mb-4 flex justify-end">
      <p className="bg-blue-400 arrow-right rounded-md py-1 px-2 text-white w-[45%]">
        {mess}
      </p>
    </div>
  );
};

export default RightMess;

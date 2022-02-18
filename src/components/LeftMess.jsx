import React from "react";

const LeftMess = ({ mess }) => {
  return (
    <div className="w-full mb-4">
      <span className="bg-white arrow-left rounded-md py-1 px-2">{mess}</span>
    </div>
  );
};

export default LeftMess;

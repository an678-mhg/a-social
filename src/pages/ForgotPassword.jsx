import React from "react";
import Title from "../components/Title";

const ForgotPassword = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Title title={"Forgot password"} />
      <form>
        <h1 className="text-2xl font-semibold">Forgot Password?</h1>
        <div className="flex">
          <input
            className="my-4 w-full outline-none px-2 py-1 rounded-sm"
            type={"text"}
            placeholder="Email address..."
          />
          <button className="bg-white text-sm heig-[32px]">Send</button>
        </div>
        <button>Back</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

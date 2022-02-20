import React, { useState } from "react";
import { loginGoogleApi } from "../action/authAction";
import Loading from "../global/Loading";

const LoginGoogleButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    await loginGoogleApi();

    setLoading(false);
  };

  return (
    <button
      onClick={handleLoginWithGoogle}
      className="justify-center text-white bg-red-500 rounded-sm w-full py-2 flex items-center"
    >
      <i className="text-xl mr-2 bx bxl-google"></i> Login with Google
      {loading && <Loading />}
    </button>
  );
};

export default LoginGoogleButton;

import { setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { loginGoogleApi } from "../action/authAction";
import { createDoc } from "../action/firebaseAction";
import { db } from "../config/firebase";
import Loading from "../global/Loading";
import { doc } from "firebase/firestore";

const LoginGoogleButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    const { _tokenResponse, user } = await loginGoogleApi();

    if (_tokenResponse.isNewUser) {
      const { displayName, email, photoURL, uid } = user;

      await setDoc(doc(db, "users", uid), {
        displayName,
        email,
        photoURL,
        following: [],
      });
    }

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

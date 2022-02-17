import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../config/firebase";

export const registerApi = async (userRegister) => {
  try {
    if (!userRegister.email || !userRegister.password) return;

    const res = await createUserWithEmailAndPassword(
      auth,
      userRegister.email,
      userRegister.password
    );

    await updateProfile(res.user, {
      displayName: userRegister.name,
      photoURL:
        "https://genvita.vn/resources/avatar/1322e982-086b-44d2-ad10-87aaa3f0f0fc?width=119&height=119&mode=crop",
    });

    toast.success("Register success");

    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const loginApi = async (userLogin) => {
  try {
    if (!userLogin.email || !userLogin.password) return;

    const res = await signInWithEmailAndPassword(
      auth,
      userLogin.email,
      userLogin.password
    );

    toast.success("Login success");

    return res;
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

export const loginGoogleApi = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);

    toast.success("Login success");

    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const getProfile = async (uid) => {
  try {
    const userRef = doc(db, `users/${uid}`);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("user ko ton tai !");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

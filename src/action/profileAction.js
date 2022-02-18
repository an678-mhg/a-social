import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const getProfile = async (uid) => {
  try {
    const userRef = doc(db, `users/${uid}`);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

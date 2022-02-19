import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const fetchAllUsers = async () => {
  try {
    const q = query(collection(db, "users"));

    const listUser = [];
    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      listUser.push({ ...doc.data(), id: doc.id });
    });

    return listUser;
  } catch (error) {
    toast.error(error.message);
  }
};

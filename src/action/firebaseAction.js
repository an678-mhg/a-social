import {
  query,
  getDocs,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const createDoc = async (table, data) => {
  try {
    const docRef = await addDoc(collection(db, table), data);
    return { ...data, id: docRef.id };
  } catch (error) {
    toast.error(error.message);
  }
};

export const fetchAllPosts = async (sort) => {
  try {
    const q = query(collection(db, "posts"), orderBy("create_at", sort));
    const postList = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      postList.push({ ...doc.data(), id: doc.id });
    });

    return postList;
  } catch (error) {
    toast.error(error.message);
  }
};

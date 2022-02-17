import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const fetchPost = async (idPost) => {
  try {
    const docRef = doc(db, `posts/${idPost}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      console.log("Post ko ton tai !!!");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deletePost = async (idPost) => {
  try {
    const docRef = doc(db, `posts/${idPost}`);
    await deleteDoc(docRef);

    toast.success("Delete post success !");
  } catch (error) {
    toast.error(error.message);
  }
};

export const fetchMyPost = async (uid) => {
  try {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", uid),
      orderBy("create_at", "desc")
    );
    const postList = [];

    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      postList.push({ ...doc.data(), id: doc.id });
    });

    return postList;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const fetchComments = async (postId) => {
  try {
    const q = query(collection(db, "comments"), where("postId", "==", postId));
    const commentList = [];

    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      commentList.push({ ...doc.data(), id: doc.id });
    });

    return commentList;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

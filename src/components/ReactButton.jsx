import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import userState from "../stored/userState";
import { Link } from "react-router-dom";
import themeStore from "../stored/themeStore";

const ReactButton = ({ post, posts, setPosts, userId }) => {
  const currentUser = userState((state) => state.curentUser);
  const theme = themeStore((state) => state.theme);

  const likePost = () => {
    const docRef = doc(db, `posts/${post.id}`);

    if (post.like?.some((p) => p === currentUser.uid)) {
      const unLike = post.like.filter((p) => p !== currentUser.uid);
      setDoc(docRef, {
        ...post,
        like: unLike,
      });

      const unLikPost = posts.map((p) => {
        if (p.id === post.id) return { ...post, like: unLike };
        return p;
      });

      return setPosts(unLikPost);
    }

    setDoc(docRef, {
      ...post,
      like: [...post.like, currentUser.uid],
    });

    const likePostNew = posts.map((p) => {
      if (p.id === post.id)
        return { ...post, like: [...post.like, currentUser.uid] };

      return p;
    });

    return setPosts(likePostNew);
  };

  return (
    <div
      className="px-4 py-3 w-full flex justify-between items-center border-t-2"
      style={{ color: theme.text_color }}
    >
      <button
        onClick={likePost}
        className={`flex items-center ${
          post.like && post.like.some((p) => p === currentUser.uid)
            ? "text-red-600"
            : `text-[${theme.text_color}]`
        }`}
      >
        <i className="bx bx-heart text-2xl mr-3"></i> {post?.like.length}
      </button>
      <Link to={`/post/${post.id}`} className="flex items-center">
        <i className="bx bx-chat text-2xl mr-3"></i> {post?.comment}
      </Link>
      <button className="flex items-center">
        <i className="bx bx-share text-2xl mr-3"></i> 0
      </button>
    </div>
  );
};

export default ReactButton;

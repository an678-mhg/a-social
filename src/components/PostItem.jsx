import React from "react";
import { Link } from "react-router-dom";
import ReactButton from "./ReactButton";
import userState from "../stored/userState";
import postState from "../stored/postState";
import { deletePost } from "../action/postAction";
import { calculateCreatedTime } from "../utils/formatTime";

const PostItem = ({ data }) => {
  const currentUser = userState((state) => state.curentUser);
  const { posts, setPosts } = postState((state) => state);

  const handleDeletePost = async (idPost) => {
    const checkDelete = window.confirm("Are you sure delete post !");
    if (!checkDelete) return;

    await deletePost(idPost);

    const newListPost = posts.filter((p) => p.id !== idPost);
    setPosts(newListPost);
  };

  return (
    <div className="mb-4 px-4 py-3 bg-white">
      <div>
        <div className="flex items-center justify-between">
          <Link to={`/profile/${data.userId}`} className="flex items-center">
            <img
              className="w-[30px] object-cover rounded-full"
              alt=""
              src={data?.photoURL}
            />
            <div>
              <p className="ml-4 text-sm">{data?.displayName}</p>

              <p className="ml-4 text-xs text-gray-500">
                {calculateCreatedTime(data.create_at)}
              </p>
            </div>
          </Link>

          {currentUser.uid === data.userId ? (
            <div onClick={() => handleDeletePost(data.id)}>
              <i className="text-xl text-red-500 bx bx-trash"></i>
            </div>
          ) : null}
        </div>
        <Link
          to={`/post/${data.id}`}
          className="block py-4 text-slate-900 text-sm"
        >
          {data?.title.length > 100 ? (
            <>
              {`${data?.title.slice(0, 80)}...`}{" "}
              <Link className="text-blue-500" to={`/post/${data?.id}`}>
                See more
              </Link>
            </>
          ) : (
            data?.title
          )}
        </Link>
      </div>
      <Link to={`/post/${data.id}`}>
        <img className="object-cover w-full" alt="PostList" src={data?.image} />
      </Link>
      <ReactButton post={data} />
    </div>
  );
};

export default PostItem;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactButton from "./ReactButton";
import userState from "../stored/userState";
import { deletePost } from "../action/postAction";
import { calculateCreatedTime } from "../utils/formatTime";
import { getProfile } from "../action/profileAction";

const PostItem = ({ data, posts, setPosts }) => {
  const currentUser = userState((state) => state.curentUser);
  const [userInfo, setUserInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    async function fetchProfile(uid) {
      const profile = await getProfile(uid);
      setUserInfo(profile);
    }

    fetchProfile(data.userId);
  }, []);

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
              src={userInfo?.photoURL}
            />
            <div>
              <p className="ml-3 text-sm">{userInfo?.displayName}</p>

              <p className="ml-3 text-xs text-gray-500">
                {calculateCreatedTime(data.create_at)}
              </p>
            </div>
          </Link>

          <div className="flex items-center">
            {currentUser.uid === data.userId ? (
              <>
                <div onClick={() => handleDeletePost(data.id)}>
                  <i className="text-xl text-red-500 bx bx-trash"></i>
                </div>
                <Link
                  to={`/edit/${data.id}?redirect=${encodeURIComponent(
                    location.pathname
                  )}`}
                  className="ml-3 block"
                >
                  <i className="text-xl text-blue-500 bx bx-edit-alt"></i>
                </Link>
              </>
            ) : null}
          </div>
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
      <ReactButton post={data} posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default PostItem;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactButton from "./ReactButton";
import userState from "../stored/userState";
import { deletePost } from "../action/postAction";
import { calculateCreatedTime } from "../utils/formatTime";
import { getProfile } from "../action/profileAction";
import themeStore from "../stored/themeStore";

const PostItem = ({ data, posts, setPosts }) => {
  const currentUser = userState((state) => state.curentUser);
  const [userInfo, setUserInfo] = useState({});
  const [loadingUser, setLoadingUser] = useState(false);
  const theme = themeStore((state) => state.theme);
  const location = useLocation();

  useEffect(() => {
    async function fetchProfile(uid) {
      const profile = await getProfile(uid);
      setUserInfo(profile);
      setLoadingUser(false);
    }

    setLoadingUser(true);
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
    <div
      className="mb-4 px-4 py-3"
      style={{ backgroundColor: theme.bg_post, color: theme.text_color }}
    >
      <div>
        <div className="flex items-center justify-between">
          <Link to={`/profile/${data.userId}`} className="flex items-center">
            <div
              className={`w-[30px] h-[30px] overflow-hidden ${
                loadingUser ? "skeleton" : ""
              } rounded-full`}
            >
              <img
                className="w-[100%] h-[100%] object-cover"
                alt=""
                src={userInfo?.photoURL}
              />
            </div>
            <div className={`${loadingUser ? "w-[150px]" : ""} ml-3`}>
              {loadingUser ? (
                <>
                  <p className="skeleton skeleton-text w-[50%]"></p>
                  <p className="skeleton skeleton-text w-[80%]"></p>
                </>
              ) : (
                <>
                  <p className="text-sm">{userInfo?.displayName}</p>

                  <p className="text-xs text-gray-500">
                    {calculateCreatedTime(data.create_at)}
                  </p>
                </>
              )}
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
          className="block py-4 text-sm"
          style={{ color: theme.text_color }}
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

import React from "react";
import PostItem from "./PostItem";
import themeStore from "../stored/themeStore";

const PostList = ({ posts, setPosts }) => {
  const theme = themeStore((state) => state.theme);

  if (posts.length === 0)
    return (
      <div
        className="w-full p-4 mt-6"
        style={{
          backgroundColor: theme.bg_post,
          color: theme.text_color,
        }}
      >
        <p className="text-center">There are no posts !</p>
      </div>
    );

  return (
    <div className="overscroll-x-auto mt-6">
      {posts.map((p) => (
        <PostItem posts={posts} setPosts={setPosts} key={p.id} data={p} />
      ))}
    </div>
  );
};

export default PostList;

import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  if (posts.length === 0)
    return (
      <div className="w-full p-4 mt-6 bg-white">
        <p className="text-center">There are no posts !</p>
      </div>
    );
  return (
    <div className="overscroll-x-auto mt-6">
      {posts.map((p) => (
        <PostItem key={p.id} data={p} />
      ))}
    </div>
  );
};

export default PostList;

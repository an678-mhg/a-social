import React from "react";
import FormCreatePost from "./FormCreatePost";
import PostList from "./PostList";
import postState from "../stored/postState";
// import SortPost from "./SortPost";

const Content = () => {
  const posts = postState((state) => state.posts);

  return (
    <>
      <FormCreatePost />
      <PostList posts={posts} />
    </>
  );
};

export default Content;

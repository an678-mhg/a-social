import React from "react";
import FormCreatePost from "./FormCreatePost";
import PostList from "./PostList";
import postState from "../stored/postState";
import Title from "./Title";
// import SortPost from "./SortPost";

const Content = () => {
  const { posts, setPosts } = postState((state) => state);

  return (
    <>
      <Title title={"A-social"} />
      <FormCreatePost />
      <PostList posts={posts} setPosts={setPosts} />
    </>
  );
};

export default Content;

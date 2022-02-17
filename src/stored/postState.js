import create from "zustand";

const useStore = create((set) => ({
  posts: [],
  setPosts: (listPost) =>
    set({
      posts: listPost,
    }),
  sort: "desc",
  setSort: (newSort) => set({ sort: newSort }),
}));

export default useStore;

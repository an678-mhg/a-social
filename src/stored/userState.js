import create from "zustand";

const useStore = create((set) => ({
  curentUser: null,
  setUser: (newUser) =>
    set({
      curentUser: newUser,
    }),
}));

export default useStore;

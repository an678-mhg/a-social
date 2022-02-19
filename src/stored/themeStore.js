import create from "zustand";

const darkTheme = {
  bg_color: "#333",
  bg_post: "#222",
  text_color: "#fff",
};

const lightTheme = {
  bg_color: "#ECF3FF",
  bg_post: "#fff",
  text_color: "#333",
};

const useStore = create((set) => ({
  theme: JSON.parse(localStorage.getItem("theme")) || darkTheme,
  setTheme: () =>
    set((state) => ({
      theme: state.theme === lightTheme ? darkTheme : lightTheme,
    })),
}));

export default useStore;

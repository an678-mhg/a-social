import React from "react";
import "./loading.css";
import themeStore from "../stored/themeStore";

const Loading = () => {
  const theme = themeStore((state) => state.theme);

  return (
    <div className="ovelay z-10" style={{ backgroundColor: theme.bg_color }}>
      <div className="dashed-loading"></div>
    </div>
  );
};

export default Loading;

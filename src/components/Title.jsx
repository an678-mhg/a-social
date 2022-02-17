import React, { useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  });

  return <></>;
};

export default Title;

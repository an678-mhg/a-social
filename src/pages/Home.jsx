import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import NavigateApp from "../components/NavigateApp";
import { Route, Routes } from "react-router-dom";
import Content from "../components/Content";
import News from "./News";
import Profile from "./Profile";
const Home = () => {
  return (
    <div className="px-3 mb-[80px]">
      <Title title={"Asocial"} />
      <Header />
      <NavigateApp />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="news" element={<News />} />
        <Route path="profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Home;

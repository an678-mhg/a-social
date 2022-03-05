import React from "react";
import Header from "../components/Header";
import NavigateApp from "../components/NavigateApp";
import { Route, Routes } from "react-router-dom";
import Content from "../components/Content";
import Chat from "./Chat";
import Profile from "./Profile";
import EditPost from "./EditPost";

const Home = () => {
  return (
    <div className="px-3 mb-[80px]">
      <Header />
      <NavigateApp />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default Home;

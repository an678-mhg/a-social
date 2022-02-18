import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMyPost } from "../action/postAction";
import { getProfile } from "../action/profileAction";
import ModalEditProFile from "../components/ModalEditProFile";
import PostList from "../components/PostList";
import ProfileBottom from "../components/ProfileBottom";
import ProfileTop from "../components/ProfileTop";
import PageNotFound from "./PageNotFound";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState({});
  const [myPost, setMyPost] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchProfile(id) {
      const data = await getProfile(id);
      setProfile(data);
    }

    fetchProfile(id);
  }, [id]);

  useEffect(() => {
    async function getMyPost(uid) {
      const data = await fetchMyPost(uid);
      setMyPost(data);
    }

    getMyPost(id);
  }, [id]);

  if (!profile) return <PageNotFound />;

  return (
    <>
      <div className="mt-4 bg-white py-6">
        <ProfileTop
          setShowModal={setShowModal}
          profile={profile}
          setProfile={setProfile}
        />

        <ProfileBottom profile={profile} totalPost={myPost.length} />
      </div>

      <PostList posts={myPost} setPosts={setMyPost} />

      {showModal && (
        <ModalEditProFile
          setShowModal={setShowModal}
          setProfile={setProfile}
          profile={profile}
        />
      )}
    </>
  );
};

export default Profile;

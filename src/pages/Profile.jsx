import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMyPost } from "../action/postAction";
import { getProfile } from "../action/profileAction";
import ModalEditProFile from "../components/ModalEditProFile";
import PostList from "../components/PostList";
import ProfileBottom from "../components/ProfileBottom";
import ProfileTop from "../components/ProfileTop";
import Title from "../components/Title";
import Loading from "../global/Loading";
import PageNotFound from "./PageNotFound";
import themeStore from "../stored/themeStore";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState({});
  const [myPost, setMyPost] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = themeStore((state) => state.theme);

  useEffect(() => {
    async function fetchProfile(id) {
      const data = await getProfile(id);
      setProfile(data);
      setLoading(false);
    }

    setLoading(true);
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
      <Title title={profile.displayName} />
      <div className="mt-4 py-6" style={{ backgroundColor: theme.bg_post }}>
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

      {loading && <Loading />}
    </>
  );
};

export default Profile;

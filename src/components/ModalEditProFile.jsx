import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import userState from "../stored/userState";

const ModalEditProFile = ({ profile, setProfile, setShowModal }) => {
  const [data, setData] = useState(profile);
  const [loading, setLoading] = useState(false);
  const { curentUser, setUser } = userState((state) => state);

  const changeProfile = async (e) => {
    e.preventDefault();

    if (
      !data.displayName.trim() ||
      !data.email.trim() ||
      !data.bio.trim() ||
      !data.bio.length > 133
    )
      return;

    setLoading(true);

    try {
      await setDoc(doc(db, `users/${data.id}`), {
        bio: data.bio,
        displayName: data.displayName,
        following: data.following,
        email: data.email,
        photoURL: data.photoURL,
      });

      await updateProfile(curentUser, { displayName: data.displayName });

      setProfile(data);
      setUser({ ...curentUser, displayName: data.displayName });
      setLoading(false);
      setShowModal(false);
      toast.success("Updated profile success !");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed w-full left-0 right-0 top-0 bottom-0 flex items-center justify-center modal-edit-profile px-3">
      <div className="bg-white opacity-100 w-full pb-6">
        <form onSubmit={changeProfile} className="px-3">
          <h1 className="w-full text-center mt-4 text-xl font-semibold">
            Edit profile
          </h1>
          <div className="w-full mt-4">
            <label className="text-md mb-3 block">Display Name</label>
            <input
              value={data.displayName}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              name="displayName"
              className="w-full bg-gray-400 rounded-sm p-2 text-white"
            />
          </div>
          <div className="w-full mt-4">
            <label className="text-md mb-3 block">Bio</label>
            <textarea
              rows="4"
              value={data.bio || ""}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              name="bio"
              className="w-full bg-gray-400 rounded-sm p-2 text-white"
            />
          </div>
          <div className="w-full text-center">
            <button
              disabled={loading}
              className="bg-slate-400 text-white px-3 py-1 rounded-sm text-md mt-3"
            >
              {loading ? "Loading..." : "Updated profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProFile;

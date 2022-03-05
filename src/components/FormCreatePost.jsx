import React, { useEffect, useState } from "react";
import { createDoc } from "../action/firebaseAction";
import { uploadImage } from "../action/uploadAction";
import userState from "../stored/userState";
import postState from "../stored/postState";
import themeStore from "../stored/themeStore";
import { toast } from "react-toastify";
import { deleteObject } from "firebase/storage";

const FormCreatePost = () => {
  const curentUser = userState((state) => state.curentUser);
  const { setPosts, posts } = postState((state) => state);
  const theme = themeStore((state) => state.theme);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPriviewImage] = useState("");

  const onChangeFile = (e) => {
    const chooseFile = e.target.files[0];

    const types = ["image/png", "image/jpeg", "image/gif"];

    if (!types.includes(chooseFile.type)) {
      return toast.error("The image type is png / jpeg / gif.");
    }

    if (chooseFile.size > 1024 * 1024) {
      return toast.error("The largest image size is 1mb.");
    }

    setFile(e.target.files[0]);

    const preview = URL.createObjectURL(e.target.files[0]);

    setPriviewImage(preview);
  };

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!title.trim() || !file)
      return toast.error("Add title and photo to create post");

    setLoading(true);

    try {
      // Upload images in server
      const url = await uploadImage(file, "images");
      // Tạo obj post data
      const newPost = {
        userId: curentUser.uid,
        title: title,
        image: url,
        like: [],
        comment: 0,
        create_at: Date.now(),
      };

      // ghi post vào db
      const res = await createDoc("posts", newPost);

      // add post vào zustand
      setPosts([res, ...posts]);

      // Reset form
      setFile(null);
      setPriviewImage(null);
      setTitle("");

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      setFile(null);
      setPriviewImage(null);
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleCreatePost}
      className="mt-6"
      style={{ backgroundColor: theme.bg_post, color: theme.text_color }}
    >
      <div className="flex px-4 py-4">
        <img
          alt=""
          className="w-[30px] rounded-full object-cover"
          src={`${
            curentUser.photoURL ||
            "https://genvita.vn/resources/avatar/1322e982-086b-44d2-ad10-87aaa3f0f0fc?width=119&height=119&mode=crop"
          }`}
        />
        <input
          className="ml-3 outline-none bg-transparent w-full"
          type="text"
          placeholder="Write something..."
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="border-t-2 px-4 py-4 flex items-center justify-between">
        <div>
          <label htmlFor="file-upload" style={{ color: theme.text_color }}>
            <i className="text-2xl bx bx-upload"></i>
          </label>
          <input
            accept="image/png, image/gif, image/jpeg"
            type={"file"}
            hidden
            id="file-upload"
            onChange={onChangeFile}
          />
        </div>

        <button
          style={{ backgroundColor: theme.bg_color, color: theme.text_color }}
          disabled={loading}
          className={`text-sm py-2 px-6 ${loading ? "dashed-loading" : ""}`}
        >
          {loading ? "" : "Post"}
        </button>
      </div>

      {previewImage && (
        <img className="w-full object-cover" src={previewImage} alt="" />
      )}
    </form>
  );
};

export default FormCreatePost;

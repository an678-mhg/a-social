import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSearchParams from "../hook/useSearchParams";
import { fetchPost } from "../action/postAction";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import themeStore from "../stored/themeStore";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = themeStore((state) => state.theme);
  const inputRef = useRef();

  useEffect(() => {
    async function getPostFromApi(id) {
      const data = await fetchPost(id);
      setPost(data.title);
      inputRef.current.focus();
    }

    getPostFromApi(id);
  }, [id]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    if (!post.trim()) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, `posts/${id}`), {
        title: post,
      });

      setLoading(false);

      navigate(`${searchParams.get("redirect")}`);
      toast.success("Updated post success !");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdatePost}
      className="p-3 mt-4"
      style={{ backgroundColor: theme.bg_post }}
    >
      <textarea
        rows="4"
        ref={inputRef}
        value={post || ""}
        onChange={(e) => setPost(e.target.value)}
        className="w-full p-2 rounded-sm outline-none"
        style={{
          backgroundColor: theme.bg_post,
          color: theme.text_color,
        }}
      />
      <div className="w-full text-right mt-3">
        <button
          style={{
            backgroundColor: theme.bg_color,
            color: theme.text_color,
          }}
          disabled={loading}
          className="text-sm px-2 py-1 rounded-sm"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default EditPost;

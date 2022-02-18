import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../action/authAction";
import Loading from "../global/Loading";
import { validateRegister } from "../utils/validate";
import ErrorValidate from "./ErrorValidate";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirm_pasword: "",
  });

  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    const error = validateRegister(formData);
    if (error.length > 0) return toast.error(<ErrorValidate error={error} />);

    setLoading(true);
    try {
      const res = await registerApi(formData);

      const { displayName, email, photoURL, uid } = res.user;

      await setDoc(doc(db, "users", uid), {
        displayName,
        email,
        photoURL,
        following: [],
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => submitForm(e)} className="w-full mt-6">
      <div className="mb-4">
        <input
          required
          placeholder="Name..."
          className="w-full px-3 py-2 rounded-sm outline-none"
          type="text"
          value={formData.name}
          name="name"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <input
          required
          placeholder="Email..."
          className="w-full px-3 py-2 rounded-sm outline-none"
          type="text"
          value={formData.email}
          name="email"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <input
          required
          placeholder="Password..."
          className="w-full px-3 py-2 rounded-sm outline-none"
          type="text"
          value={formData.password}
          name="password"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div>
        <input
          required
          placeholder="Comfirm Password..."
          className="w-full px-3 py-2 rounded-sm outline-none"
          type="text"
          value={formData.confirm_pasword}
          name="confirm_pasword"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <button className="py-2 rounded-sm mt-6 w-full text-white text-xl font-medium bg-slate-400">
        Register
      </button>

      {loading && <Loading />}
    </form>
  );
};

export default RegisterForm;

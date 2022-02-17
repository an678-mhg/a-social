import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginApi } from "../action/authAction";
import Loading from "../global/Loading";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await loginApi(formData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitForm} className="w-full mt-6">
      <div className="mb-4">
        <input
          required
          placeholder="Email..."
          className="w-full px-3 py-2 rounded-sm outline-none"
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="relative">
        <input
          required
          placeholder="Password..."
          className="w-full px-3 py-2 rounded-sm outline-none"
          type={`${showPass ? "text" : "password"}`}
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <i
          onClick={() => setShowPass(!showPass)}
          className={`absolute text-xl translate-x-[-50%] translate-y-[-50%] top-[50%] right-[10px] ${
            showPass ? "bx bx-show" : "bx bx-hide"
          }`}
        ></i>
      </div>
      <Link
        to="/forgot_password"
        className="block mt-3 text-sm text-blue-400 hover:underline text-right"
      >
        Forgot your password?
      </Link>
      <button className="py-2 rounded-sm mt-6 w-full text-white text-xl font-medium bg-slate-400">
        Login
      </button>

      {loading && <Loading />}
    </form>
  );
};

export default LoginForm;

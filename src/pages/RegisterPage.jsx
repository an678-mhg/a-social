import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link, Navigate } from "react-router-dom";
import useSearchParams from "../hook/useSearchParams";
import userState from "../stored/userState";

const RegisterPage = () => {
  const curentUser = userState((state) => state.curentUser);

  const searchParams = useSearchParams();

  if (curentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="px-3 h-screen flex items-center justify-center flex-col">
      <div className="flex items-center text-slate-400 justify-center w-full text-4xl">
        <i className="mr-2 text-slate-400 bx bx-bug-alt"></i> ASocial
      </div>
      <RegisterForm />

      <p className="mt-4">
        Do you already have an account{" "}
        <Link className="text-blue-400" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

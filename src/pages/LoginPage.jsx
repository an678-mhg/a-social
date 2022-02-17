import React from "react";
import { Link, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginGoogleButton from "../components/LoginGoogleButton";
import useSearchParams from "../hook/useSearchParams";
import userState from "../stored/userState";

const LoginPage = () => {
  const curentUser = userState((state) => state.curentUser);

  const searchParams = useSearchParams();

  if (curentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="px-3 h-screen flex items-center justify-center flex-col">
      <div className="flex items-center text-slate-400 justify-center w-full text-4xl">
        <i className="mr-2 text-slate-400 bx bx-bug-alt"></i> ASocial
      </div>
      <LoginForm />
      <div className="text-center text-sm py-3">Or</div>
      <LoginGoogleButton />

      <p className="mt-4">
        Do not have an account{" "}
        <Link className="text-blue-400" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

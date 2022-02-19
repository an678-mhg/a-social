import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link, Navigate } from "react-router-dom";
import useSearchParams from "../hook/useSearchParams";
import userState from "../stored/userState";
import themeStore from "../stored/themeStore";

const RegisterPage = () => {
  const curentUser = userState((state) => state.curentUser);
  const theme = themeStore((state) => state.theme);

  const searchParams = useSearchParams();

  if (curentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="px-3 h-screen flex items-center justify-center flex-col">
      <div
        className="flex items-center justify-center w-full text-4xl"
        style={{
          backgroundColor: theme.bg_color,
          color: theme.text_color,
        }}
      >
        <i className="mr-2 bx bx-bug-alt"></i> ASocial
      </div>
      <RegisterForm />

      <p className="mt-4" style={{ color: theme.text_color }}>
        Do you already have an account{" "}
        <Link className="text-blue-400" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

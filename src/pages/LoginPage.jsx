import React from "react";
import { Link, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginGoogleButton from "../components/LoginGoogleButton";
import useSearchParams from "../hook/useSearchParams";
import userState from "../stored/userState";
import themeStore from "../stored/themeStore";
import Title from "../components/Title";

const LoginPage = () => {
  const curentUser = userState((state) => state.curentUser);
  const theme = themeStore((state) => state.theme);

  const searchParams = useSearchParams();

  if (curentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="px-3 h-screen flex items-center justify-center flex-col">
      <Title title={"Login"} />
      <div
        className="flex items-center justify-center w-full text-4xl"
        style={{
          backgroundColor: theme.bg_color,
          color: theme.text_color,
        }}
      >
        <i className="mr-2 bx bx-bug-alt"></i> ASocial
      </div>
      <LoginForm />
      <div
        className="text-center text-sm py-3"
        style={{ color: theme.text_color }}
      >
        Or
      </div>
      <LoginGoogleButton />

      <p className="mt-4" style={{ color: theme.text_color }}>
        Do not have an account{" "}
        <Link className="text-blue-400" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

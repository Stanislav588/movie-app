import { FC, Dispatch, SetStateAction, useState } from "react";

import facebookImg from "../../images/facebook.svg";
import googleImg from "../../images/google.png";
import loginImg from "../../images/login-wallpaper.jpg";
import { useLogin } from "../../hooks/useLogin";
import { CircularProgress } from "@mui/material";
import "./Login.css";
import { useLogInInWithGoogle } from "../../hooks/useLogInWithGoogle";

import { useLogInInWithFacebook } from "../../hooks/useLogInWithFacebook";
import { motion } from "framer-motion";
type LoginProps = {
  setIsOpenSignUp: Dispatch<SetStateAction<boolean>>;
};

const Login: FC<LoginProps> = ({ setIsOpenSignUp }) => {
  const { handleSignInWithGoogle } = useLogInInWithGoogle();
  const { handleLogInWithFacebook } = useLogInInWithFacebook();
  const { handleLogin, loading } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <motion.div
      className="login-page dark:bg-gray-400 text-center w-[100%] md:w-[68%] mx-auto  rounded-md p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex-col lg:flex-row flex gap-8">
        <img src={loginImg} className="hidden lg:block h-[500px] opacity-55" />
        <div className="w-[100%]">
          <h1 className="text-3xl text-white mb-9">Welcome back</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-start text-white">Email</label>
              <input
                className="rounded-lg w-[100%] text-lg font-normal mt-1 outline-none px-2 py-2"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-start text-white">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg mt-1 text-lg outline-none px-2 py-2 w-[100%]"
                type="password"
              />
            </div>
          </div>
          <div className="flex  mt-6  justify-center">
            <button
              onClick={() => handleLogin(email, password)}
              className="login-btn px-20 py-2 bg-slate-200 hover:text-white dark:hover:text-white dark:text-blue-500 dark:hover:bg-blue-500 border gap-2 rounded-lg  hover:shadow-xl transition duration-300"
            >
              <span>
                {loading ? <CircularProgress size="22px" /> : "Continue"}
              </span>
            </button>
          </div>
          <h2 className="mt-6 text-white font-medium">Or Sign Up using </h2>
          <div className="flex justify-center mt-4 gap-6">
            <img
              onClick={handleLogInWithFacebook}
              src={facebookImg}
              alt="Facebook"
              className="w-10 h-10 rounded-full cursor-pointer "
            />

            <img
              onClick={handleSignInWithGoogle}
              src={googleImg}
              alt="Google"
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <div className="flex justify-center mt-5 items-center gap-2">
            <h2 className=" text-white font-medium">New here ?</h2>

            <p
              onClick={() => setIsOpenSignUp(true)}
              className="login-text text-lg font-medium cursor-pointer"
            >
              Sign Up
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

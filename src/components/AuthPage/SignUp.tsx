import { Dispatch, FC, SetStateAction, useState } from "react";
import facebookImg from "../../images/facebook.svg";
import loginImg from "../../images/login-wallpaper.jpg";

import googleImg from "../../images/google.png";
import { useSignUp } from "../../hooks/useSignUp";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useLogInInWithFacebook } from "../../hooks/useLogInWithFacebook";
import { useLogInInWithGoogle } from "../../hooks/useLogInWithGoogle";

type SignUpProps = {
  setIsOpenSignUp: Dispatch<SetStateAction<boolean>>;
};
const SignUp: FC<SignUpProps> = ({ setIsOpenSignUp }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleSignUp, isLoading } = useSignUp();
  const { handleSignInWithGoogle, loading } = useLogInInWithGoogle();

  const { handleLogInWithFacebook } = useLogInInWithFacebook();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="login-page text-white dark:bg-gray-400 text-center w-[100%] md:w-[68%] mx-auto  rounded-md p-3"
    >
      <div className="flex-col lg:flex-row gap-8 flex">
        <img src={loginImg} className="hidden lg:block h-[500px] opacity-55" />
        <div className="w-[100%]">
          <h1 className=" text-3xl mb-9">Sign Up</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-start" htmlFor="">
                Name
              </label>
              <input
                value={fullName}
                className="rounded-lg text-black text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-start" htmlFor="">
                Username
              </label>
              <input
                value={username}
                className="rounded-lg text-black text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-start" htmlFor="">
                Email
              </label>
              <input
                className="rounded-lg text-black text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-start" htmlFor="">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg text-black mt-1 text-lg outline-none px-2 py-2 w-[100%]"
                type="password"
              />
            </div>
          </div>
          <div className="flex  mt-6  justify-center">
            <button
              disabled={isLoading}
              onClick={() => handleSignUp(email, username, fullName, password)}
              className="login-btn px-20 py-2 bg-slate-200 hover:text-white border gap-2 rounded-lg dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500   hover:shadow-xl transition duration-300"
            >
              <span>
                {isLoading || loading ? (
                  <CircularProgress size="22px" />
                ) : (
                  "Continue"
                )}
              </span>
            </button>
          </div>
          <h2 className="mt-6">Or Log In using </h2>

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
            <h2>Allready have an account ?</h2>
            <p
              onClick={() => setIsOpenSignUp(false)}
              className="login-text text-lg font-medium cursor-pointer"
            >
              Log in
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;

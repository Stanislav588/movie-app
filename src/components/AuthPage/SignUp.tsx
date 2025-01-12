import { Dispatch, FC, SetStateAction, useState } from "react";
import facebookImg from "../../images/facebook.svg";

import googleImg from "../../images/google.png";
import { useSignUp } from "../../hooks/useSignUp";
import { CircularProgress } from "@mui/material";

import { useSignUpWithFacebook } from "../../hooks/useSignUpWithFacebook";
import { useSignUpWithGoogle } from "../../hooks/useSignUpWithGoogle";
import { motion } from "framer-motion";

type SignUpProps = {
  setIsOpenSignUp: Dispatch<SetStateAction<boolean>>;
};
const SignUp: FC<SignUpProps> = ({ setIsOpenSignUp }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleSignUp, isLoading } = useSignUp();
  const { handleSignUpWithGoogle, loading } = useSignUpWithGoogle();

  const { handleSignUpWithFacebook } = useSignUpWithFacebook();

  async function handleSigningUp() {
    await handleSignUpWithGoogle(email, fullName, username);
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-100  w-[80%] text-center md:w-[500px]  mx-auto p-4 rounded-md"
      >
        <h1 className=" text-3xl mb-9">Sign Up</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-start" htmlFor="">
              Name
            </label>
            <input
              value={fullName}
              className="rounded-lg text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
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
              className="rounded-lg text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-start" htmlFor="">
              Email
            </label>
            <input
              className="rounded-lg text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
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
              className="rounded-lg mt-1 text-lg outline-none px-2 py-2 w-[100%]"
              type="password"
            />
          </div>
        </div>
        <div className="flex  mt-6  justify-center">
          <button
            onClick={() => handleSignUp(email, username, fullName, password)}
            className="px-20 py-2 bg-slate-200 hover:text-white border gap-2 rounded-lg  hover:bg-yellow-500  hover:shadow-xl transition duration-300"
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
            onClick={handleSignUpWithFacebook}
            src={facebookImg}
            alt="Facebook"
            className="w-10 h-10 rounded-full cursor-pointer "
          />

          <img
            onClick={handleSigningUp}
            src={googleImg}
            alt="Google"
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <div className="flex justify-center mt-5 items-center gap-2">
          <h2>Allready have an account ?</h2>
          <p
            onClick={() => setIsOpenSignUp(false)}
            className="text-yellow-500 text-lg font-medium cursor-pointer"
          >
            Log in
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;

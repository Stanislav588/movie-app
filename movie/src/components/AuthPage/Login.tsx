import { FC, Dispatch, SetStateAction, useState } from "react";

import facebookImg from "../../images/facebook.svg";
import gitHubImg from "../../images/github.svg";
import googleImg from "../../images/google.png";
import { useLogin } from "../../hooks/useLogin";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useLogInInWithGoogle } from "../../hooks/useLogInWithGoogle";

type LoginProps = {
  setIsOpenSignUp: Dispatch<SetStateAction<boolean>>;
};

const Login: FC<LoginProps> = ({ setIsOpenSignUp }) => {
  const { signInWithGoogle, isLoadingGoogle } = useLogInInWithGoogle();
  const { handleLogin, isLoading } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="bg-slate-100 text-center w-[80%] md:w-[500px] mx-auto p-4 rounded-md">
      <h1 className=" text-3xl mb-9">Welcome back</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-start" htmlFor="">
            Email
          </label>
          <input
            className="rounded-lg text-lg font-normal mt-1 outline-none px-2 py-2 w-[100%]"
            type="text"
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
          onClick={() => handleLogin(email, password)}
          className="px-20 py-2 bg-slate-200 hover:text-white border gap-2 rounded-lg  hover:bg-yellow-500  hover:shadow-xl transition duration-300"
        >
          <span>
            {isLoading ? <CircularProgress size="22px" /> : "Continue"}
          </span>
        </button>
      </div>
      <h2 className="mt-6">Or Sign Up using </h2>
      <div className="flex justify-center mt-4 gap-6">
        <img
          src={facebookImg}
          alt="Facebook"
          className="w-10 h-10 rounded-full cursor-pointer "
        />

        <img
          src={gitHubImg}
          alt="GitHub"
          className="w-10 h-10 cursor-pointer "
        />

        <img
          onClick={signInWithGoogle}
          src={googleImg}
          alt="Google"
          className="w-10 h-10 cursor-pointer"
        />
      </div>
      <div className="flex justify-center mt-5 items-center gap-2">
        <h2>New here ?</h2>

        <p
          onClick={() => setIsOpenSignUp(true)}
          className="text-yellow-500 text-lg font-medium cursor-pointer"
        >
          Sign Up
        </p>
      </div>
    </div>
  );
};

export default Login;

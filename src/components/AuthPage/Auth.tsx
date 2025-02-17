import { useState } from "react";
import Header from "../Header/Header";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);
  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen dark:bg-white ">
        {isOpenSignUp ? (
          <SignUp setIsOpenSignUp={setIsOpenSignUp} />
        ) : (
          <Login setIsOpenSignUp={setIsOpenSignUp} />
        )}
      </div>
    </>
  );
};

export default Auth;

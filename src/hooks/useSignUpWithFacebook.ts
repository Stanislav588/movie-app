import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useSignUpWithFacebook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signInWithFacebook] = useSignInWithFacebook(auth);

  async function handleSignUpWithFacebook() {
    setIsLoading(true);
    try {
      const user = await signInWithFacebook();
      const userData = user?.user;

      if (userData) {
        const newUser = {
          email: userData.email,
          username: userData.email?.split("@")[0],
          fullName: userData.displayName,
          profilePicture: "",
          createdAt: Date.now(),
          uid: userData.uid,
          favorites: [],
        };
        await setDoc(doc(firestore, "users", userData.uid), newUser);
        localStorage.setItem("users", JSON.stringify(newUser));
        dispatch(updateUserInfo(newUser));
        enqueueSnackbar("User logged in successfully!", {
          variant: "success",
        });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(`Failed to sign up with Facebook: ${error}`, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleSignUpWithFacebook,
  };
};

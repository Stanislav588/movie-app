import { useState } from "react";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useSignUpWithGithub = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithGitHub] = useSignInWithGithub(auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleSignInWithGitHub() {
    setIsLoading(true);
    try {
      const data = await signInWithGitHub();
      const userData = data?.user;

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
        enqueueSnackbar("User created successfully!", {
          variant: "success",
        });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }
  return { handleSignInWithGitHub, isLoading };
};

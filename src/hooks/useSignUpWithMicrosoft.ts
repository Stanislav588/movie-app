import { useState } from "react";

import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useSignInWithMicrosoft } from "react-firebase-hooks/auth";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useSignUpWithMicrosoft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithMicrosoft, loading] = useSignInWithMicrosoft(auth);

  async function handleSignInWithMicrosoft() {
    try {
      const data = await signInWithMicrosoft();
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
        enqueueSnackbar("User logged in successfully!", {
          variant: "success",
        });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
    }
  }
  return { handleSignInWithMicrosoft, loading };
};

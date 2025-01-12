import { createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  async function handleSignUp(
    email: string,
    username: string,
    firstName: string,
    password: string
  ) {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      enqueueSnackbar("User with this username is allready exist!", {
        variant: "warning",
      });
      return;
    }

    if (!email || !username || !firstName || !password) {
      enqueueSnackbar("Fill all the fields", { variant: "warning" });
      return;
    }

    setIsLoading(true);
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;
      const userRef = doc(firestore, "users", user.uid);
      if (user) {
        const newUser = {
          email: email,
          fullName: firstName,
          username: username,
          profilePicture: "",
          createdAt: Date.now(),
          uid: user.uid,
          favorites: [],
        };
        await setDoc(userRef, newUser);
        dispatch(updateUserInfo(newUser));
        localStorage.setItem("users", JSON.stringify(newUser));
      }

      enqueueSnackbar("User created successfully", {
        variant: "success",
      });

      navigate("/");
    } catch (error) {
      enqueueSnackbar(` Error to creating a new user: ${error}`, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return {
    handleSignUp,
    isLoading,
  };
};

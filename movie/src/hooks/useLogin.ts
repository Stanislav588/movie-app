import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

export const useLogin = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  async function handleLogin(email: string, password: string) {
    if (!email || !password) {
      enqueueSnackbar("Please fill all the fields!", { variant: "warning" });
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (userCredential) {
        const docRef = doc(firestore, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          localStorage.setItem("users", JSON.stringify(docSnap.data()));
          dispatch(updateUserInfo(docSnap.data()));
          navigate("/");
          enqueueSnackbar("User logged in successfully!", {
            variant: "success",
          });
          navigate("/");
        }
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleLogin,
    isLoading,
  };
};

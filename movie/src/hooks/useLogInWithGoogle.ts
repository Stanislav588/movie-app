import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
export const useLogInInWithGoogle = () => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [SignInWithGoogle] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function signInWithGoogle() {
    setIsLoadingGoogle(true);
    try {
      const user = await SignInWithGoogle();
      const userData = user?.user;
      if (userData) {
        const userRef = doc(firestore, "users", userData.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          await setDoc(doc(firestore, "users", userData.uid), docSnap.data());
          localStorage.setItem("users", JSON.stringify(docSnap.data()));
          dispatch(updateUserInfo(docSnap.data()));
          enqueueSnackbar("User logged in successfully!", {
            variant: "success",
          });
          navigate("/");
        }
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      setIsLoadingGoogle(false);
    }
  }

  return {
    signInWithGoogle,
    isLoadingGoogle,
  };
};

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";

import { enqueueSnackbar } from "notistack";

export const useLogin = () => {
  const [signInWithEmailAndPassword, loading] =
    useSignInWithEmailAndPassword(auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  async function handleLogin(email: string, password: string) {
    if (!email || !password) {
      enqueueSnackbar("Please fill all the fields!", { variant: "warning" });
      return;
    }

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
        } else {
          enqueueSnackbar("User doesn't exist", { variant: "error" });
        }
      }
    } catch (error: any) {
      enqueueSnackbar(`Failed to login user: ${error}`, { variant: "error" });
    } finally {
    }
  }

  return {
    handleLogin,
    loading,
  };
};

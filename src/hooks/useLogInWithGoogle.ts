import { auth, firestore } from "../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { updateUserInfo } from "../slices/movieSlice";
import { UsersPropertys } from "../components/Movies/MovieInterface";
export const useLogInInWithGoogle = () => {
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSignInWithGoogle() {
    try {
      const user = await signInWithGoogle();
      const userData = user?.user;
      if (userData) {
        const userRef = doc(firestore, "users", userData.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          await setDoc(doc(firestore, "users", userData.uid), docSnap.data());
          localStorage.setItem("users", JSON.stringify(docSnap.data()));
          dispatch(updateUserInfo(docSnap.data() as UsersPropertys[]));
          enqueueSnackbar("User logged in successfully!", {
            variant: "success",
          });
          navigate("/");
        } else {
          enqueueSnackbar("User doesn't exist, try again", {
            variant: "error",
          });
        }
      }
    } catch (error) {
      enqueueSnackbar(`Failed to login with Google: ${error}`, {
        variant: "error",
      });
    }
  }

  return {
    handleSignInWithGoogle,
    loading,
  };
};

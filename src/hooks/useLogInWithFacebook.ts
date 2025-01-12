import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";

export const useLogInInWithFacebook = () => {
  const [signInWithFacebook, loading] = useSignInWithFacebook(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogInWithFacebook() {
    try {
      const userCredential = await signInWithFacebook();
      const user = userCredential?.user;
      if (user) {
        const userDoc = doc(firestore, "users", user?.uid);
        const userInfo = await getDoc(userDoc);
        if (userInfo.exists()) {
          localStorage.setItem("users", JSON.stringify(userInfo.data()));
          dispatch(updateUserInfo(userInfo.data()));
          enqueueSnackbar("User logged in successfully", {
            variant: "success",
          });
          navigate("/");
        }
      } else {
        enqueueSnackbar("User doesn't exist, try again", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(`Failed to log in with Facebook: ${error}`, {
        variant: "error",
      });
    }
  }
  return { handleLogInWithFacebook, loading };
};

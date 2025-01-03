import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";

export const useLogInWithGithub = () => {
  const dispatch = useDispatch();
  const [signInWithGitHub, loading] = useSignInWithGithub(auth);

  async function handleSignInWithGithub() {
    const userCredential = await signInWithGitHub();
    if (userCredential) {
      const userRef = doc(firestore, "users", userCredential.user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        dispatch(updateUserInfo(docSnap.data()));
        localStorage.setItem("users", JSON.stringify(docSnap.data()));
        enqueueSnackbar("You logged in successfully");
      }
    }
    try {
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  }

  return { handleSignInWithGithub };
};

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export const useSignUpWithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);
  async function handleSignUpWithGoogle(
    email: any,
    firstName: any,
    username: any
  ) {
    try {
      const data = await signInWithGoogle();
      const user = data?.user;
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
        navigate("/");
        dispatch(updateUserInfo(newUser));
        await setDoc(doc(firestore, "users", user.uid), newUser);
        localStorage.setItem("users", JSON.stringify(newUser));
        enqueueSnackbar("User created successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(`Failed to sign up with Google: ${error}`, {
        variant: "error",
      });
    }
  }
  return { handleSignUpWithGoogle, loading };
};

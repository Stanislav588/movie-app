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
      const userCredential = await signInWithGoogle();
      const userData = userCredential?.user;

      if (!userData) {
        enqueueSnackbar("Google authentication failed!", { variant: "error" });
        return;
      }

      const userRef = doc(firestore, "users", userData.uid);
      const docSnap = await getDoc(userRef);

      let updateUserData: UsersPropertys;

      if (docSnap.exists()) {
        updateUserData = docSnap.data() as UsersPropertys;
        console.log("Data : ", updateUserData);
      } else {
        updateUserData = {
          email: userData.email || "",
          fullName: userData.displayName || "Unknown User",
          username: userData.email?.split("@")[0] || "user",
          profilePicture: userData.photoURL || "",
          createdAt: Date.now(),
          uid: userData.uid,
          favorites: [],
        };

        await setDoc(userRef, updateUserData);
      }

      localStorage.setItem("users", JSON.stringify(updateUserData));
      dispatch(updateUserInfo(updateUserData));

      enqueueSnackbar("User logged in successfully!", { variant: "success" });
      navigate("/");
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

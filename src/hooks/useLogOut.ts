import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { resetProfile } from "../slices/movieSlice";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logOut() {
    try {
      await signOut();
      localStorage.removeItem("users");
      dispatch(resetProfile());
      navigate("/auth");
      enqueueSnackbar("User logged out successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`Failed to user log out${error}`, { variant: "error" });
    }
  }
  return { logOut };
};

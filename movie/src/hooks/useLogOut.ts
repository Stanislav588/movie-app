import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";

export const useLogOut = () => {
  const [signOut] = useSignOut(auth);
  async function logOut() {
    try {
      await signOut();
      localStorage.removeItem("users");
      enqueueSnackbar("User logged out successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  }
  return { logOut };
};

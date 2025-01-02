import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";
import { updateUserInfo } from "../slices/movieSlice";
import { useState } from "react";

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const authUser = useSelector((state: any) => state.movie.users);
  async function handleUpdateUser(file, username, firstName, email) {
    const storageRef = ref(storage, `profilePicture/${authUser.uid}`);
    const userRef = doc(firestore, "users", authUser.uid);
    setIsLoading(true);

    if (!username && !file && !firstName && !email) {
      enqueueSnackbar("You have no changes", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    try {
      let URL = "";

      if (file) {
        await uploadString(storageRef, file, "data_url");
        URL = await getDownloadURL(storageRef);
      }

      const updatedUser = {
        ...authUser,
        username: username || authUser.username,
        fullName: firstName || authUser.fullName,
        email: email || authUser.email,
        profilePicture: URL,
      };
      await updateDoc(userRef, updatedUser);

      dispatch(updateUserInfo(updatedUser));
      localStorage.setItem("users", JSON.stringify(updatedUser));
      enqueueSnackbar("User profile updated successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleUpdateUser, isLoading };
};

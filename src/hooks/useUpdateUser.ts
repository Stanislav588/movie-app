import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

import { useState } from "react";
import { RootState } from "../components/Movies/MovieInterface";
import { updateUserInfo } from "../slices/movieSlice";

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.movie.users);
  async function handleUpdateUser(
    file: string | null,
    username: string | undefined,
    firstName: string | undefined
  ) {
    const storageRef = ref(storage, `profilePicture/${authUser.uid}`);
    const userRef = doc(firestore, "users", authUser.uid);
    setIsLoading(true);

    if (!username && !file && !firstName) {
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
        profilePicture: URL || authUser.profilePicture,
      };
      await updateDoc(userRef, updatedUser);
      dispatch(updateUserInfo(updatedUser));
      localStorage.setItem("users", JSON.stringify(updatedUser));
      enqueueSnackbar("User profile updated successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Failed to updating user: ${error}`, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleUpdateUser, isLoading };
};

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";
import { updateUserInfo } from "../slices/movieSlice";
import { useState } from "react";

export const useAddMovieToFavorite = () => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authUser = useSelector((state: any) => state.movie.users);

  async function handleAddMoviesToFavorite(movie: any) {
    setIsLoading(true);
    try {
      if (!authUser || !authUser.uid) {
        enqueueSnackbar("User not authenticated. Please log in.", {
          variant: "error",
        });
        return;
      }
      const isAllreadyAdded = authUser.favorites.some(
        (favMovie: any) => favMovie.id === movie.id
      );
      if (isAllreadyAdded) {
        await updateDoc(doc(firestore, "users", authUser.uid), {
          favorites: arrayRemove(movie),
        });

        const removeFromRedux = {
          ...authUser,
          favorites: authUser.favorites.filter(
            (favMovie: any) => favMovie.id !== movie.id
          ),
        };
        dispatch(updateUserInfo(removeFromRedux));
        localStorage.setItem("users", JSON.stringify(removeFromRedux));
        enqueueSnackbar("Removed to favorites", { variant: "success" });
        setIsAdded(false);
      } else {
        await updateDoc(doc(firestore, "users", authUser.uid), {
          favorites: arrayUnion(movie),
        });

        const updateReduxState = {
          ...authUser,
          favorites: [...(authUser.favorites || []), movie],
        };
        localStorage.setItem("users", JSON.stringify(updateReduxState));
        dispatch(updateUserInfo(updateReduxState));

        enqueueSnackbar("Added to favorites", { variant: "success" });

        setIsAdded(true);
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleAddMoviesToFavorite,
    isLoading,
    isAdded,
  };
};

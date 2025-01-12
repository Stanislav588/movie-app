import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../firebase/firebase";
import { enqueueSnackbar } from "notistack";
import { updateUserInfo } from "../slices/movieSlice";
import { useState } from "react";
import { MovieDetails, RootState } from "../components/Movies/MovieInterface";

export const useAddMovieToFavorite = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authUser = useSelector((state: RootState) => state.movie.users);

  async function handleAddMoviesToFavorite(movie: MovieDetails) {
    setIsLoading(true);
    try {
      if (!authUser || !authUser.uid) {
        enqueueSnackbar("User not authenticated. Please log in.", {
          variant: "error",
        });
        return;
      }

      const isAllreadyAdded = authUser?.favorites?.some(
        (favMovie: MovieDetails) => favMovie.id === movie.id
      );
      if (isAllreadyAdded) {
        await updateDoc(doc(firestore, "users", authUser.uid), {
          favorites: arrayRemove(movie),
        });

        const removeFromRedux = {
          ...authUser,
          favorites: authUser.favorites.filter(
            (favMovie: MovieDetails) => favMovie.id !== movie.id
          ),
        };
        dispatch(updateUserInfo(removeFromRedux));
        localStorage.setItem("users", JSON.stringify(removeFromRedux));
        enqueueSnackbar("Removed from wishlist", { variant: "success" });
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
        enqueueSnackbar("Added to wishlist", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(`Error adding movie to favorite: ${error}`, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleAddMoviesToFavorite,
    isLoading,
  };
};

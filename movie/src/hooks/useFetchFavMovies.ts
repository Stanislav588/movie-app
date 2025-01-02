import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";
import { firestore } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateMovies, updateUserInfo } from "../slices/movieSlice";

export const useFetchFavMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [favMovies, setFavMovies] = useState([]);
  const authUser = useSelector((state: any) => state.movie.users);

  useEffect(() => {
    if (!authUser || !authUser.uid) return;
    async function handleFetchFavMovies() {
      const q = query(
        collection(firestore, "users"),
        where("uid", "==", authUser.uid)
      );
      setIsLoading(true);
      try {
        const querySnap = await getDocs(q);
        const favoriteMoviesArr = authUser.favorites.filter(
          (movie: any) => movie.id
        );
        querySnap.forEach((doc) => {
          favoriteMoviesArr.push({ ...doc.data(), id: doc.id });
        });
        dispatch(updateMovies(favoriteMoviesArr));
        setFavMovies(favoriteMoviesArr);
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    }

    handleFetchFavMovies();
  }, [authUser]);

  return { favMovies, isLoading };
};

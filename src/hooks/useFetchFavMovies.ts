import { collection, getDocs, query, where } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";
import { firestore } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  MovieDetails,
  MovieInfo,
  RootState,
} from "../components/Movies/MovieInterface";

export const useFetchFavMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favMovies, setFavMovies] = useState<MovieInfo[]>([]);
  const authUser = useSelector((state: RootState) => state.movie.users);

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
        const favoriteMoviesArr: MovieInfo[] = authUser.favorites.filter(
          (movie: MovieDetails) => movie.id
        );

        querySnap.forEach((doc) => {
          favoriteMoviesArr.push({ ...doc.data(), id: doc.id } as MovieInfo);
        });

        setFavMovies(favoriteMoviesArr);
      } catch (error) {
        enqueueSnackbar(`Failed to fetch favorite movies: ${error}`, {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    handleFetchFavMovies();
  }, [authUser]);

  return { isLoading, favMovies };
};

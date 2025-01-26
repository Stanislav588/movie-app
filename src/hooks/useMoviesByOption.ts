import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { fetchMoviesBy } from "../services/api";

export const useMoviesByOption = () => {
  const { sortedMovies, setLocalState } = useContext(MovieContext);
  useEffect(() => {
    let isCancelled = false;
    const fetchingMovies = async () => {
      try {
        const res = await fetchMoviesBy(sortedMovies);
        if (!isCancelled) {
          setLocalState(res);
        }
      } catch (error) {
        if (!isCancelled) {
          console.log("Error : ", error);
        }
      }
    };
    fetchingMovies();
    return () => {
      isCancelled = true;
    };
  }, [sortedMovies]);
  return {};
};

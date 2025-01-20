import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { fetchMoviesBy } from "../services/api";
import { updateMovies } from "../slices/movieSlice";
import { useDispatch } from "react-redux";

export const useMoviesByOption = () => {
  const dispatch = useDispatch();
  const { sortedMovies, setLocalState } = useContext(MovieContext);
  useEffect(() => {
    let isCancelled = false;
    const fetchingMovies = async () => {
      try {
        const res = await fetchMoviesBy(sortedMovies);
        if (!isCancelled) {
          //   dispatch(updateMovies(res));
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

import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { searchMovieByName } from "../services/api";
import { useDispatch } from "react-redux";

export const useMoviesByName = () => {
  const {
    searchMovie,
    setIsLoadingSearchMovieName,
    movieDataByName,
    setMovieDataByName,
  } = useContext(MovieContext);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    const handleSearchByName = async () => {
      setIsLoadingSearchMovieName(true);
      try {
        const res = await searchMovieByName(searchMovie);
        if (!isCancelled) {
          setMovieDataByName(res);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching movie:", error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSearchMovieName(false);
        }
      }
    };

    handleSearchByName();
    return () => {
      isCancelled = true;
    };
  }, [searchMovie, dispatch]);

  return { movieDataByName };
};

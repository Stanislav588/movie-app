import { useContext, useEffect, useState } from "react";
import fetchingData from "../services/api";

import { useDispatch } from "react-redux";
import { MovieContext } from "../context/MovieContext";
import { updateMovies } from "../slices/movieSlice";

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setLocalState, localState } = useContext(MovieContext);
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetchingData();
        if (!isCancelled) {
          dispatch(updateMovies(res));
          setLocalState(res);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching movies:", error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();
    return () => {
      isCancelled = true;
    };
  }, []);
  return { localState, isLoading };
};

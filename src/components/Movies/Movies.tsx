import Movie from "./Movie";
import { MovieInfo, RootState } from "./MovieInterface";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useMovies } from "../../hooks/useMovies";

import "./Button.css";
import { Box, CircularProgress } from "@mui/material";
const Movies = () => {
  const movies = useSelector((state: RootState) => state.movie.movies);

  const { localState, isLoading } = useMovies();
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const isMovies = movies && movies.length > 0 && localState.length > 0;

  const moviesToFetch = movies.length > 0 ? movies : localState;

  return (
    <>
      {
        <div className="grid dark:bg-white  relative py-12 px-2 grid-cols-2 lg:grid-cols-8  sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size="50px" />
            </Box>
          ) : (
            isMovies &&
            moviesToFetch?.map((movie: MovieInfo) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Movie imageBaseURL={imageBaseURL} movie={movie} />
              </motion.div>
            ))
          )}
        </div>
      }
    </>
  );
};

export default Movies;

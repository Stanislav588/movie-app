import { FC, useContext, useState } from "react";
import Movie from "./Movie";
import { MovieContext } from "../../context/MovieContext";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import MoviePropertys, { RootState } from "./MovieInterface";
import { motion } from "framer-motion";
const Movies: FC = () => {
  const movies = useSelector((state: RootState) => state.movie.movies);
  const [showMoreMovies, setShowMoreMovies] = useState<number>(8);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState<boolean>(true);
  const { isLoading } = useContext(MovieContext);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const isMovies = movies && movies.length > 0;

  function handleShowMoreMovies() {
    setShowMoreMovies(showMoreMovies + 30);
    setIsShowMoreBtn(false);
  }
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}
        >
          <CircularProgress size="100px" />
        </Box>
      ) : (
        <div className="grid relative mt-12 px-2 grid-cols-2 lg:grid-cols-8  sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isMovies &&
            movies.slice(0, showMoreMovies).map((movie: MoviePropertys) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Movie imageBaseURL={imageBaseURL} movie={movie} />
              </motion.div>
            ))}
        </div>
      )}

      {isShowMoreBtn && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleShowMoreMovies}
          className="block text-2xl rounded-full py-1 mt-3 transition-all  hover:bg-yellow-600 border border-yellow-600 px-8 mx-auto text-white"
        >
          Show more
        </motion.button>
      )}
    </>
  );
};

export default Movies;

import { FC, useContext, useState } from "react";
import Movie from "./Movie";
import { MovieContext } from "../../context/MovieContext";
import { MovieInfo, RootState } from "./MovieInterface";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useMovies } from "../../hooks/useMovies";
import { Skeleton } from "@mui/material";

const Movies: FC = () => {
  const movies = useSelector((state: RootState) => state.movie.movies);
  const [showMoreMovies, setShowMoreMovies] = useState<number>(8);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState<boolean>(true);
  const { isLoading } = useContext(MovieContext);
  const { localState } = useMovies();
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const isMovies = movies && movies.length > 0 && localState.length > 0;

  const moviesToFetch = movies.length > 0 ? movies : localState;

  function handleShowMoreMovies() {
    setShowMoreMovies(showMoreMovies + 30);
    setIsShowMoreBtn(false);
  }
  const renderSkeletons = () => (
    <div className="grid relative mt-12 px-2 grid-cols-2 lg:grid-cols-8 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: showMoreMovies }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={250}
          animation="wave"
          style={{ borderRadius: "8px" }}
        />
      ))}
    </div>
  );
  return (
    <>
      {isLoading ? (
        renderSkeletons()
      ) : (
        <div className="grid relative mt-12 px-2 grid-cols-2 lg:grid-cols-8  sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isMovies &&
            moviesToFetch?.slice(0, showMoreMovies).map((movie: MovieInfo) => (
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
          className="block text-2xl rounded-full py-1 mt-3 mb-10 transition-all  hover:bg-yellow-600 border border-yellow-600 px-8 mx-auto text-white"
        >
          Show more
        </motion.button>
      )}
    </>
  );
};

export default Movies;

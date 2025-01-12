import { FC, useEffect, useState } from "react";
import { fetchMoviesByGenre, fetchNowPlayingMovies } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

import MoviePropertys from "../Movies/MovieInterface";
import SingleMovie from "./SingleMovie";

const Documentary: FC = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MoviePropertys[]>(
    []
  );
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    const handleFetchDocumentary = async () => {
      try {
        const res = await fetchMoviesByGenre(99);
        setNowPlayingMovies(res);
      } catch (error) {
        enqueueSnackbar(`Failet to fetch actions: ${error}`, {
          variant: "error",
        });
      }
    };
    handleFetchDocumentary();
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-3xl mb-2  bg-gradient-to-l from-slate-400 from-50%">
          Documentary
        </h1>
        <div className="flex overflow-x-auto gap-2 ">
          {nowPlayingMovies.map((movie: MoviePropertys) => {
            return (
              <SingleMovie
                key={movie.id}
                imageBaseURL={imageBaseURL}
                movie={movie}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Documentary;

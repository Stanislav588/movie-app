import { FC, useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../services/api";
import MoviePropertys from "../Movies/MovieInterface";
import { enqueueSnackbar } from "notistack";
import SingleMovie from "./SingleMovie";
import { motion } from "framer-motion";

const Comedy: FC = () => {
  const [comedy, setComedy] = useState<MoviePropertys[]>([]);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    const handleFetchComedy = async () => {
      try {
        const res = await fetchMoviesByGenre(35);
        setComedy(res);
      } catch (error) {
        enqueueSnackbar(`Failet to fetch actions: ${error}`, {
          variant: "error",
        });
      }
    };
    handleFetchComedy();
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white mb-2 bg-gradient-to-l from-slate-400 from-50%  text-3xl">
          Comedy
        </h1>
        <div className="flex gap-2 overflow-x-auto scrollbar-hidden">
          {comedy.map((movie: MoviePropertys) => {
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
export default Comedy;

import { FC, useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
import { MovieInfo } from "../Movies/MovieInterface";
import SingleMovie from "./SingleMovie";
const Actions: FC = () => {
  const [actions, setActions] = useState<MovieInfo[]>([]);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    const handleFetchActions = async () => {
      try {
        const res = await fetchMoviesByGenre(28);
        setActions(res);
      } catch (error) {
        enqueueSnackbar(`Failet to fetch actions: ${error}`, {
          variant: "error",
        });
      }
    };
    handleFetchActions();
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-3xl mb-2  bg-gradient-to-l from-slate-400 from-50%">
          Actions
        </h1>
        <div className="flex overflow-x-auto gap-2 ">
          {actions.map((movie: MovieInfo) => {
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

export default Actions;

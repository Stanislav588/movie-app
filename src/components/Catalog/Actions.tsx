import { useContext, useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
import { MovieInfo } from "../Movies/MovieInterface";
import SingleMovie from "./SingleMovie";
import { MovieContext } from "../../context/MovieContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Skeleton } from "@mui/material";
const Actions = () => {
  const [actions, setActions] = useState<MovieInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const { scrollLeft, scrollContainer, scrollRight } = useContext(MovieContext);
  useEffect(() => {
    const handleFetchActions = async () => {
      setIsLoading(true);
      try {
        const res = await fetchMoviesByGenre(28);
        setActions(res);
      } catch (error) {
        enqueueSnackbar(`Failet to fetch actions: ${error}`, {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchActions();
  }, []);
  return (
    <>
      <motion.div
        className="relative pt-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-white dark:text-gray-900 font-medium text-3xl mb-2  bg-gradient-to-l from-slate-400 from-50%">
          Actions
        </h1>
        <button
          onClick={() => scrollLeft("actions")}
          className="absolute top-1/2  bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronLeft size={40} />
        </button>
        <div
          ref={(el) => (scrollContainer.current["actions"] = el)}
          className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-2 "
        >
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <Skeleton key={index} />)
            : actions &&
              actions.length > 0 &&
              actions.map((movie: MovieInfo) => {
                return (
                  <SingleMovie
                    key={movie.id}
                    imageBaseURL={imageBaseURL}
                    movie={movie}
                  />
                );
              })}
        </div>
        <button
          onClick={() => scrollRight("actions")}
          className="absolute right-0 top-1/2  bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronRight size={40} />
        </button>
      </motion.div>
    </>
  );
};

export default Actions;

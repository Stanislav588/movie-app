import { useContext, useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../services/api";
import { MovieInfo } from "../Movies/MovieInterface";
import { enqueueSnackbar } from "notistack";
import SingleMovie from "./SingleMovie";
import { motion } from "framer-motion";
import { MovieContext } from "../../context/MovieContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Skeleton } from "@mui/material";

const Historical = () => {
  const { scrollContainer, scrollLeft, scrollRight } = useContext(MovieContext);
  const [history, setHistory] = useState<MovieInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    const handleFetchHistories = async () => {
      setIsLoading(true);
      try {
        const res = await fetchMoviesByGenre(36);
        setHistory(res);
      } catch (error) {
        enqueueSnackbar(`Failet to fetch actions: ${error}`, {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchHistories();
  }, []);
  return (
    <>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-white dark:text-gray-900 font-medium mb-2 bg-gradient-to-l from-slate-400 from-50%  text-3xl">
          Historical
        </h1>
        <button
          onClick={() => scrollLeft("historical")}
          className="absolute top-1/2 left-0 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronLeft size={40} />
        </button>
        <div
          ref={(el) => (scrollContainer.current["historical"] = el)}
          className="flex gap-2 scroll-smooth overflow-x-auto scrollbar-hide"
        >
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <Skeleton key={index} />)
            : history.map((movie: MovieInfo) => {
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
          onClick={() => scrollRight("historical")}
          className="absolute top-1/2 right-0 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronRight size={40} />
        </button>
      </motion.div>
    </>
  );
};
export default Historical;

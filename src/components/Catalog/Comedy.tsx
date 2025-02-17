import { useContext, useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../services/api";
import { MovieInfo } from "../Movies/MovieInterface";
import { enqueueSnackbar } from "notistack";
import SingleMovie from "./SingleMovie";
import { motion } from "framer-motion";
import { MovieContext } from "../../context/MovieContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Skeleton } from "@mui/material";

const Comedy = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { scrollLeft, scrollRight, scrollContainer } = useContext(MovieContext);
  const [comedy, setComedy] = useState<MovieInfo[]>([]);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    const handleFetchComedy = async () => {
      setIsLoading(true);
      try {
        const res = await fetchMoviesByGenre(35);
        setComedy(res);
      } catch (error) {
        enqueueSnackbar(`Failet to fetch actions: ${error}`, {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchComedy();
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
          Comedy
        </h1>
        <div
          ref={(el) => (scrollContainer.current["comedy"] = el)}
          className="flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          <button
            onClick={() => scrollLeft("comedy")}
            className="absolute top-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
          >
            <FaChevronLeft size={40} />
          </button>
          <button
            onClick={() => scrollRight("comedy")}
            className="absolute right-0 top-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
          >
            <FaChevronRight size={40} />
          </button>
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <Skeleton key={index} />)
            : comedy.map((movie: MovieInfo) => {
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

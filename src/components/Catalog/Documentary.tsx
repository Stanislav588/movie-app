import { useContext, useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

import SingleMovie from "./SingleMovie";
import { MovieInfo } from "../Movies/MovieInterface";
import { MovieContext } from "../../context/MovieContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Documentary = () => {
  const { scrollContainer, scrollLeft, scrollRight } = useContext(MovieContext);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieInfo[]>([]);
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
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-white text-3xl mb-2  bg-gradient-to-l from-slate-400 from-50%">
          Documentary
        </h1>
        <button
          onClick={() => scrollLeft("documentary")}
          className="absolute left-0 top-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronLeft size={40} />
        </button>
        <div
          ref={(el) => (scrollContainer.current["documentary"] = el)}
          className="flex overflow-x-auto gap-2 scroll-smooth scrollbar-hide"
        >
          {nowPlayingMovies.map((movie: MovieInfo) => {
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
          onClick={() => scrollRight("documentary")}
          className="absolute top-1/2 right-0 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronRight size={40} />
        </button>
      </motion.div>
    </>
  );
};

export default Documentary;

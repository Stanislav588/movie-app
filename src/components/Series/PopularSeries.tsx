import { FC, useContext, useEffect } from "react";

import { getPopularSeries } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { updatePopularSeries } from "../../slices/movieSlice";
import { RootState } from "../Movies/MovieInterface";
import { SeriesInfo } from "./Series";
import SingleSeries from "./SingleSeries";
import { motion } from "framer-motion";
import { MovieContext } from "../../context/MovieContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularSeries: FC = () => {
  const { scrollContainer, scrollLeft, scrollRight } = useContext(MovieContext);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  const popularSeries = useSelector(
    (state: RootState) => state.movie.popularSeries
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const handleFetchPopularSeries = async () => {
      try {
        const res = await getPopularSeries();
        dispatch(updatePopularSeries(res));
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: "error" });
      }
    };
    handleFetchPopularSeries();
  }, []);
  return (
    <motion.div
      className="relative pt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-white dark:text-blue-900 text-3xl mb-2 bg-gradient-to-l dark:from-blue-600 from-yellow-600 from-50%">
        Popular Series
      </h1>
      <button
        onClick={() => scrollLeft("pop-series")}
        className="absolute left-0 top-1/2  bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
      >
        <FaChevronLeft size={40} />
      </button>
      <div
        ref={(el) => (scrollContainer.current["pop-series"] = el)}
        className="flex gap-2 scrollbar-hide scroll-smooth overflow-x-auto"
      >
        {popularSeries?.length > 0 &&
          popularSeries?.map((item: SeriesInfo) => {
            return (
              <SingleSeries key={item.id} imageURL={imageBaseURL} item={item} />
            );
          })}
      </div>
      <button
        onClick={() => scrollRight("pop-series")}
        className="absolute right-0 top-1/2  bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
      >
        <FaChevronRight size={40} />
      </button>
    </motion.div>
  );
};

export default PopularSeries;

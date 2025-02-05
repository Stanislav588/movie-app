import { FC, useContext, useEffect } from "react";
import { getTopRatedSeries } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateTopRatedSeries } from "../../slices/movieSlice";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

import { RootState } from "../Movies/MovieInterface";
import SingleSeries from "./SingleSeries";
import { SeriesInfo } from "./Series";
import { MovieContext } from "../../context/MovieContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RatedSeries: FC = () => {
  const { scrollLeft, scrollRight, scrollContainer } = useContext(MovieContext);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  const dispatch = useDispatch();
  const topRatedSeries = useSelector(
    (state: RootState) => state.movie.topRatedSeries
  );

  useEffect(() => {
    const handleFetchTopRatedSeries = async () => {
      try {
        const res = await getTopRatedSeries();
        dispatch(updateTopRatedSeries(res));
      } catch (error) {
        enqueueSnackbar(`Error to fetch series: ${error}`, {
          variant: "error",
        });
      }
    };
    handleFetchTopRatedSeries();
  }, []);
  return (
    <>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-white text-3xl mb-2   bg-gradient-to-l from-yellow-600 from-50%">
          Rated Series
        </h1>
        <button
          onClick={() => scrollLeft("rated-series")}
          className="absolute left-0 top-1/2  bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronLeft size={40} />
        </button>
        <div
          ref={(el) => (scrollContainer.current["rated-series"] = el)}
          className="flex scrollbar-hide gap-2 scroll-smooth overflow-x-auto"
        >
          {topRatedSeries?.length > 0 &&
            topRatedSeries?.map((item: SeriesInfo) => {
              return (
                <SingleSeries
                  key={item.id}
                  imageURL={imageBaseURL}
                  item={item}
                />
              );
            })}
        </div>
        <button
          onClick={() => scrollRight("rated-series")}
          className="absolute right-0 top-1/2  bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-10"
        >
          <FaChevronRight size={40} />
        </button>
      </motion.div>
    </>
  );
};

export default RatedSeries;

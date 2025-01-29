import { FC, useEffect } from "react";
import { getTopRatedSeries } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateTopRatedSeries } from "../../slices/movieSlice";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

import { RootState } from "../Movies/MovieInterface";
import SingleSeries from "./SingleSeries";
import { SeriesInfo } from "./Series";

const RatedSeries: FC = () => {
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-3xl mb-2   bg-gradient-to-l from-yellow-600 from-50%">
          Rated Series
        </h1>
        <div className="flex scrollbar-hide gap-2 overflow-x-auto">
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
      </motion.div>
    </>
  );
};

export default RatedSeries;

import { FC, useEffect } from "react";

import { getPopularSeries } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { updatePopularSeries } from "../../slices/movieSlice";
import { RootState } from "../Movies/MovieInterface";
import { SeriesInfo } from "./Series";
import SingleSeries from "./SingleSeries";
import { motion } from "framer-motion";

const PopularSeries: FC = () => {
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
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-3xl mb-2   bg-gradient-to-l from-yellow-600 from-50%">
          Popular Series
        </h1>

        <div className="flex gap-2 scrollbar-hide overflow-x-auto">
          {popularSeries?.length > 0 &&
            popularSeries?.map((item: SeriesInfo) => {
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

export default PopularSeries;

import { FC, useContext, useEffect } from "react";
import { getSeriesGenres } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { MovieContext } from "../../context/MovieContext";
import { listOfSeriesGenres } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { updateSeries } from "../../slices/movieSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Genres } from "../Movies/MovieInterface";

const SeriesGenres: FC = () => {
  const { handleSeriesGenres, seriesGenres } = useContext(MovieContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchSeriesGenres = async () => {
      try {
        const res = await getSeriesGenres(seriesGenres);
        dispatch(updateSeries(res));
      } catch (error) {
        enqueueSnackbar("Failed to fetch genres", { variant: "error" });
      }
    };
    handleFetchSeriesGenres();
  }, [seriesGenres]);

  const filteredGenresList = listOfSeriesGenres.filter(
    (item: Genres) =>
      item.name !== "Action" &&
      item.name !== "Adventure" &&
      item.name !== "Fantasy" &&
      item.name !== "Thriller" &&
      item.name !== "Horror" &&
      item.name !== "War" &&
      item.name !== "Musical" &&
      item.name !== "Animation"
  );
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white mt-9 mb-10 gap-3 relative overflow-x-auto flex"
      >
        {filteredGenresList.map((item: Genres) => {
          return (
            <Link className="relative group" key={item.id} to={`/${item.name}`}>
              <>
                <div
                  onClick={() => handleSeriesGenres(item.id)}
                  className="bg-yellow-600 rounded-md flex gap-1 flex-col justify-center items-center min-w-[150px] h-[80px]"
                >
                  <p className="text-3xl">
                    <i className={item.icon}></i>
                  </p>
                  <div>{item.name}</div>
                  <div className="absolute rounded-lg transition-all hover:bg-white opacity-35 inset-0"></div>
                </div>
              </>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SeriesGenres;

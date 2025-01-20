import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SeriesInfo } from "./Series";
import { motion } from "framer-motion";
interface SeriesItemProps {
  seriesItem: SeriesInfo;
  imageURL: string;
}
const RenderSeriesItem: FC<SeriesItemProps> = ({ seriesItem, imageURL }) => {
  return (
    <Link to={`/series/${seriesItem.id}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative transition-all group"
      >
        {seriesItem.poster_path && (
          <img
            className="rounded-sm"
            src={`${imageURL}${seriesItem.poster_path}`}
            alt={seriesItem.title}
          />
        )}

        <div className="absolute inset-0 text-white bg-black bg-opacity-55 opacity-0  group-hover:opacity-100  transition-all duration-300 rounded-sm flex flex-col justify-center items-center">
          <h3 className="text-lg font-bold text-center">{seriesItem.title}</h3>
          <div className="flex items-center gap-1 mt-2">
            <FaStar className="text-xl" />
            <p className="text-2xl font-medium">
              {parseFloat(seriesItem.vote_average).toFixed(1)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
export default RenderSeriesItem;

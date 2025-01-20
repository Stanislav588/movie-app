import { FC } from "react";
import { SeriesInfo } from "./Series";
import { Link } from "react-router-dom";

interface SeriesProps {
  item: SeriesInfo;
  imageURL: string;
}
const SingleSeries: FC<SeriesProps> = ({ item, imageURL }) => {
  return (
    <div className="min-w-[200px]  relative group">
      <Link to={`/series/${item.id}`}>
        <img className="rounded-lg" src={`${imageURL}${item.poster_path}`} />
        <div className="absolute inset-0 text-white bg-black bg-opacity-55 opacity-0  group-hover:opacity-100  transition-all duration-300"></div>
      </Link>
    </div>
  );
};

export default SingleSeries;

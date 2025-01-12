import { FC } from "react";
import MoviePropertys from "../Movies/MovieInterface";
import { Link } from "react-router-dom";

export interface MovieProps {
  movie: MoviePropertys;
  imageBaseURL: string;
}
const SingleMovie: FC<MovieProps> = ({ movie, imageBaseURL }) => {
  return (
    <div className="min-w-48 relative group">
      <Link to={`/${movie.id}`}>
        <img
          className="rounded-lg"
          src={`${imageBaseURL}${movie.poster_path}`}
        />

        <div className="absolute inset-0 text-white bg-black bg-opacity-55 opacity-0  group-hover:opacity-100  transition-all duration-300"></div>
      </Link>
    </div>
  );
};
export default SingleMovie;

import { FC } from "react";
import MoviePropertys from "./MovieInterface";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export interface MovieProps {
  movie: MoviePropertys;
  imageBaseURL: string;
}

const Movie: FC<MovieProps> = ({ movie, imageBaseURL }) => {
  return (
    <Link to={`/${movie.id}`}>
      <div className="relative  transition-all group">
        {movie.poster_path && (
          <img
            className="rounded-sm"
            src={`${imageBaseURL}${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <div className="absolute inset-0 text-white bg-black bg-opacity-55 opacity-0  group-hover:opacity-100  transition-all duration-300 rounded-sm flex flex-col justify-center items-center">
          <h3 className="text-lg font-bold text-center">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-2">
            <FaStar className="text-xl" />
            <p className="text-2xl font-medium">
              {parseFloat(movie.vote_average).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Movie;

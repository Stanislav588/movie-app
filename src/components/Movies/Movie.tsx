import { FC } from "react";

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MovieInfo } from "./MovieInterface";

export interface MovieProps {
  movie: MovieInfo;
  imageBaseURL: string;
}

const Movie: FC<MovieProps> = ({ movie, imageBaseURL }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative transition-all group">
        {movie.poster_path ? (
          <>
            <img
              className="rounded-sm"
              src={`${imageBaseURL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="absolute inset-0 text-white bg-black bg-opacity-55 opacity-0  group-hover:opacity-100  transition-all duration-300 rounded-sm flex flex-col justify-center items-center">
              <h3 className="text-lg font-bold text-center">{movie.title}</h3>
              <div className="flex items-center gap-1 mt-2">
                <FaStar className="text-xl" />
                <p className="text-2xl font-medium">
                  {parseFloat(movie.vote_average).toFixed(1) || "0.0"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-sm bg-gray-300 flex items-center justify-center h-full w-full">
            <p className="text-gray-500">No Image</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Movie;

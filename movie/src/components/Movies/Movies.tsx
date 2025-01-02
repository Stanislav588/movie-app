import { FC, useContext } from "react";
import Movie from "./Movie";
import { MovieContext } from "../../context/MovieContext";
import { CircularProgress } from "@mui/material";

const Movies: FC = () => {
  const { movies, isLoading } = useContext(MovieContext);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const isMovies = movies && movies.length > 0;
  return (
    <>
      {/* <SearchMovie setSearchMovie={setSearchMovie} searchMovie={searchMovie} /> */}
      <div className="grid relative mt-12 px-2 grid-cols-2 lg:grid-cols-5  sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          <CircularProgress size="20px" />
        ) : (
          isMovies &&
          movies.map((movie) => (
            <Movie imageBaseURL={imageBaseURL} movie={movie} key={movie.id} />
          ))
        )}
      </div>
    </>
  );
};

export default Movies;

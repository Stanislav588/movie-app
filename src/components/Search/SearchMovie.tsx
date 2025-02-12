import { FC, useContext, useEffect } from "react";
import { MovieContext } from "../../context/MovieContext";
import { IoClose } from "react-icons/io5";
import Movie from "../Movies/Movie";

import { MovieInfo } from "../Movies/MovieInterface";
import { Box, CircularProgress } from "@mui/material";
import { useMoviesByName } from "../../hooks/useMoviesByName";
import "./SearchMovie.css";
interface SearchMovieProps {
  setIsShowInput: (query: boolean) => void;
}
const SearchMovie: FC<SearchMovieProps> = ({ setIsShowInput }) => {
  const { searchMovie, setSearchMovie, isLoadingSearchMovieName } =
    useContext(MovieContext);
  const { movieDataByName } = useMoviesByName();

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  function handleCloseSearch() {
    setIsShowInput(false);
    setSearchMovie("");
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="search-container absolute top-0 px-5 py-4  left-0 right-0 z-50 overflow-y-auto min-h-screen w-[100%]">
      <div className="flex justify-end">
        <IoClose
          onClick={handleCloseSearch}
          className="text-3xl transition-all cursor-pointer hover:text-yellow-200"
        />
      </div>
      <form>
        <input
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          placeholder="Search for movies..."
          className="border-b mt-5 block mx-auto text-slate-100 text-2xl border-b-slate-500  w-[100%] px-4 py-3 bg-transparent outline-none"
        />
      </form>

      {isLoadingSearchMovieName ? (
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginTop: "250px",
          }}
        >
          <CircularProgress size="100px" />
        </Box>
      ) : (
        <div className="mt-14 gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid overflow-y-auto max-h-[80vh]">
          {movieDataByName &&
            movieDataByName.map((movie: MovieInfo) => {
              return (
                <Movie
                  imageBaseURL={imageBaseURL}
                  movie={movie}
                  key={movie.id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchMovie;

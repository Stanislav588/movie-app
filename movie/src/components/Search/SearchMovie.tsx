import { FC, useContext, useEffect } from "react";
import { MovieContext } from "../../context/MovieContext";
import { IoClose } from "react-icons/io5";
import Movie from "../Movies/Movie";

interface SearchMovieProps {
  setIsShowInput: (query: boolean) => void;
}

const SearchMovie: FC<SearchMovieProps> = ({ setIsShowInput }) => {
  const {
    searchMovie,
    setSearchMovie,
    isSearchByNameLoading,
    searchedMovieByNameData,
  } = useContext(MovieContext);
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
    <div className="absolute top-0 px-8 py-4  left-0 right-0 z-50 overflow-y-auto  bg-black min-h-screen w-[100%]">
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
          className="border-b mt-5 block mx-auto text-slate-100 text-2xl border-b-slate-500  w-[80%] px-4 py-3 bg-transparent outline-none"
        />
      </form>

      <div className="mt-14 gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid overflow-y-auto max-h-[80vh]">
        {searchedMovieByNameData.map((movie) => {
          return (
            <Movie imageBaseURL={imageBaseURL} movie={movie} key={movie.id} />
          );
        })}
      </div>
    </div>
  );
};

export default SearchMovie;

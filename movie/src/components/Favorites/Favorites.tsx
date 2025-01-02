import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Movie from "../Movies/Movie";
import Header from "../Header/Header";
import MoviePropertys from "../Movies/MovieInterface";

import { useFetchFavMovies } from "../../hooks/useFetchFavMovies";
import { enqueueSnackbar } from "notistack";

const Favorites: FC = () => {
  const movieState = useSelector((state: any) => state.movie.movies);
  const authUser = useSelector((state: any) => state.movie.users);
  const imageBaseURL = "https://image.tmdb.org/t/p/w400";
  useEffect(() => {
    if (!authUser.uid) {
      enqueueSnackbar("You have to register into your account", {
        variant: "warning",
      });
    }
  }, [authUser.uid]);
  const { favMovies } = useFetchFavMovies();

  return (
    <>
      <Header />
      <div>
        <h1 className="text-white text-3xl px-8">My Movies</h1>

        {favMovies.length === 0 ? (
          <h1 className="text-center text-3xl text-white">
            Here you can add your favorites movies
          </h1>
        ) : (
          <div className="grid relative mt-14 px-2 grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {favMovies.map((movie: MoviePropertys) => (
              <Movie key={movie.id} imageBaseURL={imageBaseURL} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Favorites;

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Movie from "../Movies/Movie";
import Header from "../Header/Header";
import { MovieInfo, RootState } from "../Movies/MovieInterface";

import { enqueueSnackbar } from "notistack";
import { useFetchFavMovies } from "../../hooks/useFetchFavMovies";
import { Box, CircularProgress } from "@mui/material";

const Favorites: FC = () => {
  const authUser = useSelector((state: RootState) => state.movie.users);

  const { isLoading, favMovies } = useFetchFavMovies();

  const imageBaseURL = "https://image.tmdb.org/t/p/w400";
  useEffect(() => {
    if (!authUser.uid) {
      enqueueSnackbar("You have to register into your account", {
        variant: "warning",
      });
    }
  }, [authUser.uid]);

  return (
    <>
      <Header />
      <div>
        <h1 className="text-white text-3xl px-8">Watchlist</h1>

        {favMovies.length === 0 ? (
          <h1 className="text-center mt-32 text-3xl text-white">
            Here you can add your favorite movies and series
          </h1>
        ) : isLoading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="50px" />
          </Box>
        ) : (
          <div className="grid relative mt-14 px-2 grid-cols-3 lg:grid-cols-7 sm:grid-cols-4 md:grid-cols-4 gap-6">
            {favMovies.map((movie: MovieInfo) => {
              return (
                <Movie
                  key={movie.id}
                  imageBaseURL={imageBaseURL}
                  movie={movie}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default Favorites;

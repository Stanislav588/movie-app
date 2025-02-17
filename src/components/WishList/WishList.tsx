import { useEffect } from "react";
import { useSelector } from "react-redux";
import Movie from "../Movies/Movie";
import Header from "../Header/Header";
import { MovieInfo, RootState } from "../Movies/MovieInterface";

import { enqueueSnackbar } from "notistack";
import { useFetchFavMovies } from "../../hooks/useFetchFavMovies";
import { Box, CircularProgress } from "@mui/material";
import Footer from "../Footer/Footer";
import { SeriesInfo } from "../Series/Series";
type FavoriteItem = MovieInfo | SeriesInfo;
const WishList = () => {
  const authUser = useSelector((state: RootState) => state.movie.users);

  const { isLoading, favMovies } = useFetchFavMovies();
  console.log(favMovies);
  const imageBaseURL = "https://image.tmdb.org/t/p/w400";
  useEffect(() => {
    if (!authUser?.uid) {
      enqueueSnackbar("You have to register into your account", {
        variant: "warning",
      });
    }
  }, [authUser?.uid]);

  return (
    <>
      <Header />
      <div className="dark:bg-white pt-14 min-h-screen">
        <h1 className="text-white text-3xl dark:text-black px-8">WishList</h1>

        {favMovies.length === 0 ? (
          <h1 className="text-center mt-32 dark:text-black text-3xl text-white">
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
            {favMovies.map((movie: FavoriteItem) => {
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
      <Footer />
    </>
  );
};
export default WishList;

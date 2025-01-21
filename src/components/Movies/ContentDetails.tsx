import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  fetchCredits,
  fetchMovieVideos,
  getContentDetails,
  getRecommendations,
  getReviews,
  getSeriesCredits,
  getSeriesDetails,
  getSeriesRecomendations,
  getSeriesReviews,
  getSeriesTrailer,
} from "../../services/api";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";
import ImageNotAvailable from "../../images/not-available.webp";
import defaultImage from "../../images/default-avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useAddMovieToFavorite } from "../../hooks/useAddMovieToFavorite";
import { Box, CircularProgress } from "@mui/material";
import { MovieContext } from "../../context/MovieContext";
import { motion } from "framer-motion";

import {
  Actors,
  MovieInfo,
  Reviews,
  RootState,
  SeriesActors,
  recommendedFilms,
} from "./MovieInterface";
import ActorPage from "./ActorPage";
import {
  updateActors,
  updateChoosedMovie,
  updateRecommendations,
  updateReviews,
  updateSeries,
} from "../../slices/movieSlice";
import { MovieOrSeries } from "../Series/Series";

interface ContentProps {
  isMovie: boolean;
}
const ContentDetails: FC<ContentProps> = ({ isMovie }) => {
  const navigate = useNavigate();
  const { setMovieVideosData, movieVideosData } = useContext(MovieContext);

  const authUser = useSelector((state: RootState) => state.movie.users);
  const movie = useSelector((state: RootState) => state.movie.movieDetails);
  const series = useSelector((state: RootState) => state.movie.series);
  const actors = useSelector((state: RootState) => state.movie.actors);
  const reviews = useSelector((state: RootState) => state.movie.reviews);
  const recommendations = useSelector(
    (state: RootState) => state.movie.recommendations
  );
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  // const [actors, setActors] = useState([]);
  const dispatch = useDispatch();
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
  const [isOpenActorsPage, setIsOpenActorsPage] = useState<boolean>(false);
  const { handleAddMoviesToFavorite, isLoading } = useAddMovieToFavorite();
  const { id } = useParams<{ id: string }>();

  const checkContent: MovieOrSeries = isMovie ? movie : series;
  const handleToAddToFavorite = async () => {
    if (!movie || !movie.id) {
      enqueueSnackbar("Movie information is missing.", { variant: "error" });
      return;
    }

    if (authUser?.uid) {
      await handleAddMoviesToFavorite(movie);
    } else {
      enqueueSnackbar("Please log in or register first", {
        variant: "error",
      });
      navigate("/auth");
    }
  };

  const handleFetchContent = async () => {
    setIsContentLoading(true);
    try {
      const response = isMovie
        ? await getContentDetails(id)
        : await getSeriesDetails(id);

      dispatch(updateChoosedMovie(response));
      dispatch(updateSeries(response));
      console.log("Response:", response);
    } catch (error) {
      enqueueSnackbar(`Failed to load movie: ${error}`, {
        variant: "error",
      });
    } finally {
      setIsContentLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = isMovie
        ? await fetchMovieVideos(id)
        : await getSeriesTrailer(id);
      setMovieVideosData(res);
      console.log("Trailer: ", res);
    } catch (error) {
      enqueueSnackbar(`Failed to load trailer: ${error}`, {
        variant: "error",
      });
    }
  };

  const handleRecommendations = async () => {
    try {
      const response = isMovie
        ? await getRecommendations(id)
        : await getSeriesRecomendations(id);
      if (response) {
        dispatch(updateRecommendations(response));
        window.scrollTo(0, 0);
      }
    } catch (error) {
      enqueueSnackbar(`Fail to load Movies: ${error}`, { variant: "error" });
    }
  };

  const handleFetchReviews = async () => {
    try {
      if (isMovie) {
        const res = await getReviews(id);
        const transformedMovieData = res.map((movie: Reviews) => ({
          ...movie,
          content: movie.content.slice(0, 100) + "...",
        }));
        dispatch(updateReviews(transformedMovieData));
        console.log(transformedMovieData);
      } else {
        const res = await getSeriesReviews(id);
        const transformedSeriesData = res.map((movie: Reviews) => ({
          ...movie,
          content: movie.content.slice(0, 100) + "...",
        }));
        dispatch(updateReviews(transformedSeriesData));
      }
    } catch (error) {
      enqueueSnackbar(`Failed to load reviews: ${error}`, { variant: "error" });
    }
  };

  const handleFetchCredits = async () => {
    try {
      if (isMovie) {
        const res = await fetchCredits(id);
        dispatch(updateActors(res.cast));
      } else {
        const res = await getSeriesCredits(id);
        dispatch(updateActors(res.cast));
      }
    } catch (error) {
      enqueueSnackbar(`Failed to fetch actors: ${error}`, { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        handleFetchContent(),
        fetchVideos(),
        handleRecommendations(),
        handleFetchReviews(),
        handleFetchCredits(),
      ]);
    };

    fetchData();
  }, [id, isMovie]);
  // const officialTrailer = movieVideosData.filter(
  //   (video) => video.type === "Trailer"
  // );
  if (!movie) {
    <div>
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
    </div>;
  }
  return (
    <>
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 md:px-10 block mx-auto"
      >
        <div>
          <Link to={"/"}>
            <button className="bg-slate-600 px-7 py-1 text-gray-400 hover:text-white transition-all rounded-lg text-lg">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-8 text-white flex  flex-col sm:flex-row md:flex-row gap-10">
          {checkContent?.poster_path && (
            <div className="lg:min-w-[300px]  lg:max-w-[400px] md:min-w-[300px] md:max-w-[400px] sm:min-w-[300px] sm:max-w-[400px]">
              <img
                className="w-full h-auto rounded-md"
                src={`${imageBaseURL}${checkContent?.poster_path}`}
                alt="Movie Poster"
              />
            </div>
          )}

          <div className="flex flex-col gap-10 justify-between">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4 flex-col md:flex-row  flex-wrap">
                <h1 className="text-3xl">
                  {checkContent?.title ||
                    checkContent?.name ||
                    "Title not available"}
                </h1>
              </div>
              <div className="flex gap-4 flex-wrap lg:gap-7">
                {isMovie ? (
                  checkContent?.spoken_languages?.map((item, id) => (
                    <p key={id}>{item.name}</p>
                  ))
                ) : (
                  <>
                    <div className="flex gap-1">
                      <p>Seasons:</p>
                      <p className="text-yellow-600 font-semibold">
                        {checkContent?.number_of_seasons}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>Episodes:</p>
                      <p className="text-yellow-600 font-semibold">
                        {checkContent?.number_of_episodes}
                      </p>
                    </div>
                  </>
                )}

                <p>
                  {checkContent?.runtime &&
                    `
                ${Math.floor(checkContent.runtime / 60)} hours ${
                      checkContent.runtime % 60
                    } 
                `}
                </p>

                {checkContent?.origin_country}
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-3xl text-yellow-400" />
                <p className="text-2xl">
                  {checkContent?.vote_average
                    ? parseFloat(checkContent.vote_average).toFixed(1)
                    : "N/A"}
                </p>
              </div>

              <p className="w-[100%] hidden md:block text-slate-300 lg:w-[80%]">
                {movie?.overview}
              </p>
              <button
                onClick={handleToAddToFavorite}
                type="button"
                className="text-white leading-normal   border border-yellow-600 hover:bg-yellow-600 focus:ring-4 focus:outline-none w-44  font-medium rounded-lg text-sm px-3  py-2.5 text-center me-2 mb-2  "
              >
                {isLoading ? (
                  <CircularProgress size={10} style={{ margin: "0 auto" }} />
                ) : (
                  <h1>
                    {authUser?.favorites?.some(
                      (certainMovie: MovieInfo) =>
                        certainMovie.id === checkContent?.id
                    )
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </h1>
                )}
              </button>

              <div className="overflow-x-auto mt-4 w-[350px] md:w-full lg:w-full hidden md:flex text-center gap-4 ">
                {actors?.length === 0 ? (
                  <h1 className="text-2xl text-center text-yellow-600">
                    No actors to this movie
                  </h1>
                ) : (
                  actors?.slice(0, 7).map((credit: SeriesActors) => {
                    return (
                      <div className="flex-shrink-0" key={credit.id}>
                        {credit.profile_path ? (
                          <img
                            alt={credit.name}
                            className="w-[150px] h-[150px] object-cover rounded-md"
                            src={`${imageBaseURL}${credit.profile_path}`}
                          />
                        ) : (
                          <img
                            className="w-[150px] h-[150px] object-cover rounded-md"
                            src={defaultImage}
                          />
                        )}

                        <p className="py-2">{credit.name}</p>
                      </div>
                    );
                  })
                )}

                {isOpenActorsPage && <ActorPage />}
              </div>

              {actors?.length > 0 && (
                <Link to={`/actors/${id}`} state={{ isMovie }}>
                  <button
                    className="text-yellow-500 hover:text-white transition-all hidden md:block "
                    onClick={() => setIsOpenActorsPage(true)}
                  >
                    Show all actors
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <p className="w-[100%] mt-6 sm:block block md:hidden  text-slate-300 lg:w-[80%]">
          {checkContent?.overview}
        </p>
        <div className="flex flex-col mt-5 text-white gap-2">
          <h1 className="text-3xl mb-5 text-yellow-500">Description</h1>
          <div className="flex gap-1 items-center">
            <h2 className="font-semibold">Released:</h2>
            <p className="text-slate-100">
              {checkContent?.release_date || checkContent?.first_air_date}
            </p>
          </div>
          <div className="flex gap-1 flex-wrap items-center">
            <h2 className="font-semibold">Genre: </h2>
            <div className="flex items-center flex-wrap">
              {checkContent?.genres &&
                checkContent?.genres?.map((genre, index) => (
                  <p className="text-slate-100" key={genre.id}>
                    {genre.name}
                    {index < movie?.genres?.length - 1 ? ", " : " "}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-1">
            <h2 className="font-semibold">Production: </h2>
            <div className="flex flex-wrap ">
              {checkContent?.production_companies?.map((company, index) => (
                <p className="text-slate-100" key={company.id}>
                  {company.name}
                  {index < checkContent?.production_companies.length - 1
                    ? " ,"
                    : " "}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <h2 className="font-semibold ">
              {isMovie ? "Duration:" : "Duration of episode:"}
            </h2>
            <p className="text-slate-100">
              {checkContent?.runtime || checkContent?.episode_run_time} min
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl mb-5 block  md:hidden text-yellow-500 mt-7">
            Actors
          </h1>
          <div className=" overflow-x-auto mt-4 flex md:hidden text-center gap-4 ">
            {actors?.slice(0, 7).map((credit: SeriesActors) => {
              return (
                <div className="flex-shrink-0" key={credit.id}>
                  {credit.profile_path ? (
                    <img
                      alt={credit.name}
                      className="w-[150px] h-[150px] object-cover rounded-md"
                      src={`${imageBaseURL}${credit.profile_path}`}
                    />
                  ) : (
                    <img
                      className="w-[150px] h-[150px] object-cover rounded-md"
                      src={ImageNotAvailable}
                    />
                  )}

                  <p className="py-2">{credit.name}</p>
                </div>
              );
            })}
            <div className="flex items-center">
              <Link to={`/actors/${id}`} state={{ isMovie }}>
                <button
                  className="border-2 w-32 text-white py-1 rounded-lg  border-yellow-600"
                  onClick={() => setIsOpenActorsPage(true)}
                >
                  Show all actors
                </button>
              </Link>
            </div>

            {isOpenActorsPage && <ActorPage />}
          </div>
          <h1 className="text-3xl text-white mt-16 mb-5">Trailer</h1>
          {movieVideosData.length > 0 ? (
            movieVideosData.slice(0, 1).map((video) => {
              return (
                <div
                  key={video.id}
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    maxWidth: "100%",
                  }}
                >
                  <iframe
                    width="80%"
                    height="80%"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0 }}
                  ></iframe>
                  {!video.key && <CircularProgress size="20px" />}
                </div>
              );
            })
          ) : (
            <h1 className="text-white text-2xl text-center">
              Trailer is not available
            </h1>
          )}
        </div>

        <div>
          <h1 className="text-3xl text-white mt-16 mb-5">Reviews</h1>

          {reviews?.length === 0 ? (
            <h1 className="text-2xl text-center mt-4 text-white">
              No comments to this movie
            </h1>
          ) : (
            <div
              className="
            flex
            gap-6
            overflow-x-auto
            scrollbar-thin
            scrollbar-thumb-gray-500
            scrollbar-track-gray-800
            "
            >
              {reviews?.map((detail: Reviews) => {
                return (
                  <div key={detail.id}>
                    <Link to={`${detail.url}`}>
                      <div className="bg-neutral-800 hover:bg-neutral-700 transition-all cursor-pointer text-white p-5 rounded-lg w-[50%] min-h-[200px] min-w-[400px] max-w-[400px]">
                        <div className="flex mb-7 flex-col">
                          <h1 className="text-2xl font-medium">
                            {detail.author}
                          </h1>
                          <p>2 days ago</p>
                        </div>
                        <p className="text-white">{detail.content}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-48">
          <h1 className="text-3xl mb-3 font-medium text-white">
            You may also like
          </h1>

          <div className="grid sm:grid-cols-3 grid-cols-3 justify-center md:grid-cols-5 lg:grid-cols-7 gap-4">
            {recommendations?.map((content: MovieInfo) => {
              return (
                <div
                  key={content.id}
                  className="cursor-pointer transition-all relative group"
                >
                  <Link
                    to={
                      isMovie ? `/movie/${content.id}` : `/series/${content.id}`
                    }
                  >
                    <div>
                      {content.poster_path ? (
                        <img
                          className="rounded-sm"
                          src={`${imageBaseURL}${content.poster_path}`}
                        />
                      ) : (
                        <img
                          className="h-[400%] w-full object-cover"
                          src="https://picsum.photos/id/1015/212/318/?text=Image+Not+Available"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-55 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-lg font-bold">{content.title}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContentDetails;

import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";
import ImageNotAvailable from "../../images/not-available.webp";
import defaultImage from "../../images/default-avatar.jpg";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import "./Reviews.css";
import { useAddMovieToFavorite } from "../../hooks/useAddMovieToFavorite";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { MovieContext } from "../../context/MovieContext";
import { motion } from "framer-motion";
import {
  Actors,
  MovieDetails,
  MovieInfo,
  Reviews,
  RootState,
  SeriesActors,
} from "./MovieInterface";
import ActorPage from "./ActorPage";
import { SeriesInfo } from "../Series/Series";
import { useApiCalls } from "../../hooks/useApiCalls";
import { fetchRecommendContent } from "../../features/RecommendContentThunk";
import { fetchReviews } from "../../features/ReviewsThunk";
import { fetchContent } from "../../features/contentThunk";
import { fetchTrailer } from "../../features/TrailerThunk";
import { fetchActors } from "../../features/ActorsThunk";

interface ContentProps {
  isMovie: boolean;
}
const ContentDetails: FC<ContentProps> = ({ isMovie }) => {
  const navigate = useNavigate();
  const { setMovieVideosData, movieVideosData } = useContext(MovieContext);
  const { handleApiCalls, isLoading } = useApiCalls();
  const authUser = useSelector((state: RootState) => state.movie.users);
  const movie = useSelector(
    (state: RootState) => state.movie.movieDetails
  ) as MovieDetails;
  const series = useSelector(
    (state: RootState) => state.movie.series as SeriesInfo[]
  );
  const actors = useSelector(
    (state: RootState) => state.movie.actors as Actors[]
  );
  const reviews = useSelector(
    (state: RootState) => state.movie.reviews as Reviews[]
  );
  const recommendations = useSelector(
    (state: RootState) => state.movie.recommendations as MovieInfo[]
  );
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const checkContent: MovieDetails = isMovie ? movie : series;
  const [isOpenActorsPage, setIsOpenActorsPage] = useState<boolean>(false);
  const { handleAddMoviesToFavorite, isAddToFavLoading } =
    useAddMovieToFavorite();
  const { id } = useParams<{ id: string }>();

  const handleToAddToFavorite = async () => {
    if (!movie || !movie.id) {
      enqueueSnackbar("Movie information is missing.", { variant: "error" });
      return;
    }

    if (authUser?.uid) {
      await handleAddMoviesToFavorite(isMovie ? movie : series);
    } else {
      enqueueSnackbar("Please log in or register first", {
        variant: "error",
      });
      navigate("/auth");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      await Promise.all([
        handleApiCalls(fetchContent({ id, isMovie })),
        handleApiCalls(fetchTrailer({ id, isMovie })).then((data) =>
          setMovieVideosData(data.response)
        ),
        handleApiCalls(fetchRecommendContent({ id, isMovie })),
        handleApiCalls(fetchReviews({ id, isMovie })),
        handleApiCalls(fetchActors({ id, isMovie })),
      ]);
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [id, isMovie]);

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
        className="px-6 md:px-10 pt-14 dark:bg-white  block mx-auto"
      >
        <div>
          <Link to={"/"}>
            <button className="content-btn dark:border-blue-500  dark:bg-blue-500 px-7 py-1 text-white transition-all rounded-lg text-lg">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-8 text-white flex  flex-col sm:flex-row md:flex-row gap-10">
          {checkContent?.poster_path ? (
            <div className="lg:min-w-[300px]  lg:max-w-[400px] md:min-w-[300px] md:max-w-[400px] sm:min-w-[300px] sm:max-w-[400px]">
              <img
                className="w-full h-auto rounded-md"
                src={`${imageBaseURL}${checkContent?.poster_path}`}
                alt="Movie Poster"
              />
            </div>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={500} />
          )}

          <div className="flex flex-col gap-10 justify-between">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4 flex-col md:flex-row  flex-wrap">
                <h1 className="text-3xl dark:text-black">
                  {checkContent?.title ||
                    checkContent?.name ||
                    "Title not available"}
                </h1>
              </div>
              <div className="flex gap-4 dark:text-black flex-wrap lg:gap-7">
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
                <p className="text-2xl dark:text-black">
                  {checkContent?.vote_average
                    ? parseFloat(checkContent.vote_average).toFixed(1)
                    : "N/A"}
                </p>
              </div>

              <p className="w-[100%] dark:text-blue-500 hidden md:block text-slate-300 lg:w-[80%]">
                {movie?.overview}
              </p>
              <button
                onClick={handleToAddToFavorite}
                type="button"
                className="add-content-btn text-white  dark:text-black leading-normal dark:border-blue-500 dark:hover:bg-blue-500  border focus:ring-4 focus:outline-none w-44  font-medium rounded-lg text-sm px-3  py-2.5 text-center me-2 mb-2  "
              >
                {isAddToFavLoading ? (
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

              <div className="overflow-x-auto dark:text-black mt-4 w-[350px] md:w-full lg:w-full hidden md:flex text-center gap-4 ">
                {actors?.length === 0
                  ? Array.from({ length: 7 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="circular"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    ))
                  : actors?.slice(0, 7).map((credit: SeriesActors) => {
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
                    })}

                {isOpenActorsPage && <ActorPage />}
              </div>

              {actors?.length > 0 && (
                <Link to={`/actors/${id}`} state={{ isMovie }}>
                  <button
                    className="actors-btn  hover:text-white dark:text-blue-500 transition-all hidden md:block "
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
        <div className="flex dark:text-blue-500 flex-col mt-5 text-white gap-2">
          <h1 className="description text-3xl dark:text-blue-500  mb-5">
            Description
          </h1>
          <div className="flex gap-1 items-center">
            <h2 className="font-semibold">Released:</h2>
            <p className="text-slate-100 dark:text-black font-medium">
              {checkContent?.release_date || checkContent?.first_air_date}
            </p>
          </div>
          <div className="flex gap-1  flex-wrap items-center">
            <h2 className="font-semibold">Genre: </h2>
            <div className="flex items-center flex-wrap">
              {checkContent?.genres &&
                checkContent?.genres?.map((genre, index) => (
                  <p
                    className="text-slate-100 dark:text-black font-medium"
                    key={genre.id}
                  >
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
                <p
                  className="text-slate-100 dark:text-black font-medium"
                  key={company.id}
                >
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
            <p className="text-slate-100 dark:text-black font-medium">
              {checkContent?.runtime || checkContent?.episode_run_time} min
            </p>
          </div>
        </div>
        <div>
          <h1 className="actors-text dark:text-blue-500 text-3xl mb-5 block  md:hidden mt-7">
            Actors
          </h1>
          <div className="overflow-x-auto mt-4 flex md:hidden text-center gap-4 ">
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

                  <p className="py-2 text-white">{credit.name}</p>
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
          <h1 className="text-3xl dark:text-blue-500 text-white mt-16 mb-14">
            Reviews
          </h1>

          {reviews?.length === 0 ? (
            <h1 className="text-2xl dark:text-black text-center mt-4 text-white">
              There are no comments to this movie yet ☺️
            </h1>
          ) : (
            <div
              className="
            flex
            gap-6
            overflow-x-auto
            scrollbar-thin
            scrollbar-hide
            scrollbar-thumb-gray-500
            scrollbar-track-gray-800
            "
            >
              {reviews?.map((detail: Reviews) => {
                return (
                  <div key={detail.id}>
                    <Link to={`${detail.url}`}>
                      <div className="reviews-container dark:bg-blue-200 transition-all cursor-pointer text-white p-5 rounded-lg w-[380px]">
                        <div className="flex mb-7 flex-col">
                          <h1 className="author-text text-2xl font-medium dark:text-blue-500">
                            {detail.author}
                          </h1>
                          <p>2 days ago</p>
                        </div>
                        <p className="text-white dark:text-gray-700">
                          {detail.content}
                        </p>
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
            {recommendations?.map((content: MovieInfo, index) => {
              return (
                <div
                  key={index}
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
                        <img className="h-[400%] w-full object-cover" src="" />
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

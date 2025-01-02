import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  fetchMovieVideos,
  getCertainMovie,
  getRecommendations,
  getReviews,
} from "../../services/api";
import Header from "../Header/Header";
import { FaStar } from "react-icons/fa";

import { useSelector } from "react-redux";

import { enqueueSnackbar } from "notistack";
import { useAddMovieToFavorite } from "../../hooks/useAddMovieToFavorite";

import { CircularProgress, Skeleton } from "@mui/material";
import { MovieContext } from "../../context/MovieContext";
import { Reviews } from "./MovieInterface";

interface recommendedFilms {
  poster_path: string;
  id: number;
  title: string;
}
interface CertainMovies {
  id: string;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  origin_country: string;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  title: string;
  runtime: number;
  genres: { name: string; id: number }[];
  spoken_languages: { name: string }[];
  video: boolean;
  production_companies: { name: string; id: number }[];
  vote_average: string;
  vote_count: number;
}
const CertainMovie: FC = () => {
  const navigate = useNavigate();
  const { setMovieVideosData, movieVideosData, setReviews, reviews } =
    useContext(MovieContext);
  const authUser = useSelector((state: any) => state.movie.users);
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const [certainMovie, setCertainMovie] = useState<CertainMovies | null>(null);
  const [recommendedFilms, setRecommendedFilms] = useState<recommendedFilms[]>(
    []
  );
  const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false);
  const { handleAddMoviesToFavorite, isLoading, isAdded } =
    useAddMovieToFavorite();
  const { id } = useParams<{ id: string }>();
  async function handleToAddToFavorite() {
    if (authUser?.uid) {
      await handleAddMoviesToFavorite(certainMovie);
    } else {
      enqueueSnackbar("Please log in or register to add favorites.", {
        variant: "error",
      });
      navigate("/auth");
    }
  }

  useEffect(() => {
    async function handleCertainMovie() {
      setIsMovieLoading(true);
      try {
        const response = await getCertainMovie(id);
        if (response) {
          setCertainMovie(response);
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setIsMovieLoading(false);
      }
    }
    handleCertainMovie();
  }, [id]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetchMovieVideos(id);
        setMovieVideosData(res);
        console.log("Videos : ", res);
      } catch (error) {
        enqueueSnackbar("Videos fetching error", { variant: "error" });
      }
    };
    fetchVideos();
  }, [id]);
  useEffect(() => {
    async function handleRecommendations() {
      try {
        const response = await getRecommendations(id);
        if (response) {
          setRecommendedFilms(response);
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleRecommendations();
  }, [id]);

  useEffect(() => {
    async function handleFetchReviews() {
      try {
        const res = await getReviews(id);

        const transformedData = res.map((movie: any) => ({
          ...movie,
          content: movie.content.slice(0, 100) + "...", // Add a shortened description
        }));

        setReviews(transformedData);
        console.log("Reviews : ", res);
      } catch (error) {
        enqueueSnackbar("Reviews error", { variant: "error" });
      }
    }
    handleFetchReviews();
  }, [id]);

  const officialTrailer = movieVideosData.filter(
    (video) => video.type === "Trailer"
  );
  return (
    <>
      <Header />

      <div className="px-6 md:px-10 block mx-auto">
        <div>
          <Link to={"/"}>
            <button className="bg-slate-600 px-7 py-1 text-gray-400 hover:text-white transition-all rounded-lg text-lg">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-8 text-white flex  flex-col sm:flex-row md:flex-row gap-10">
          {isMovieLoading ? (
            <Skeleton animation="wave" variant="rectangular" />
          ) : certainMovie?.poster_path ? ( // Use the state variable
            <div className="lg:min-w-[300px]  lg:max-w-[400px] md:min-w-[300px] md:max-w-[400px] sm:min-w-[300px] sm:max-w-[400px]">
              <img
                className="w-[100%] rounded-md"
                src={`${imageBaseURL}${certainMovie.poster_path}`} // Use the state variable here
                alt="Movie Poster"
              />
            </div>
          ) : (
            <div>No image available</div>
          )}

          <div className="flex flex-col gap-10 justify-between">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4 justify-between flex-col md:flex-row  flex-wrap">
                <h1 className="text-3xl">{certainMovie?.title}</h1>
                <button
                  onClick={handleToAddToFavorite}
                  type="button"
                  className="text-white leading-normal   border border-yellow-600 hover:bg-yellow-600 focus:ring-4 focus:outline-none w-44  font-medium rounded-lg text-sm px-3  py-2.5 text-center me-2 mb-2  "
                >
                  {isLoading ? (
                    <CircularProgress size={10} style={{ margin: "0 auto" }} />
                  ) : (
                    <h1>
                      {isAdded ? "Remove from favorites" : "Add to favorites"}
                    </h1>
                  )}
                </button>
              </div>
              <div className="flex gap-4 flex-wrap lg:gap-7">
                {certainMovie?.spoken_languages?.map((item, id) => (
                  <p key={id}>{item.name}</p>
                ))}

                <p>
                  {certainMovie?.runtime &&
                    `
                ${Math.floor(certainMovie.runtime / 60)} hours ${
                      certainMovie.runtime % 60
                    } m
                `}
                </p>

                {certainMovie?.origin_country}
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-3xl text-yellow-400" />
                <p className="text-2xl">
                  {certainMovie?.vote_average
                    ? parseFloat(certainMovie.vote_average).toFixed(1)
                    : "N/A"}
                </p>
              </div>

              <p className="w-[100%] hidden md:block text-slate-300 lg:w-[80%]">
                {certainMovie?.overview}
              </p>
            </div>
          </div>
        </div>
        <p className="w-[100%] mt-6 sm:block block md:hidden  text-slate-300 lg:w-[80%]">
          {certainMovie?.overview}
        </p>
        <div className="flex flex-col mt-5 text-white gap-2">
          <h1 className="text-3xl mb-5">Description</h1>
          <div className="flex gap-1 items-center">
            <h2 className="font-semibold">Released:</h2>
            <p className="text-slate-100">{certainMovie?.release_date}</p>
          </div>
          <div className="flex gap-1 flex-wrap items-center">
            <h2 className="font-semibold">Genre: </h2>
            <div className="flex items-center flex-wrap">
              {certainMovie?.genres?.map((genre) => (
                <p className="text-slate-100" key={genre.id}>
                  {" "}
                  {genre.name},{" "}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-1">
            <h2 className="font-semibold">Production: </h2>
            <div className="flex flex-wrap ">
              {certainMovie?.production_companies?.map((company) => (
                <p className="text-slate-100" key={company.id}>
                  {company.name},{" "}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <h2 className="font-semibold">Duration: </h2>
            <p className="text-slate-100">{certainMovie?.runtime} min</p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl text-white mt-16 mb-5">Trailer</h1>
          {officialTrailer.length > 0 ? (
            officialTrailer.slice(0, 1).map((video) => {
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
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0 }}
                  ></iframe>
                  {!video.key && <CircularProgress size="20px" />}
                </div>
              );
            })
          ) : (
            <h1 className="text-white">No trailer</h1>
          )}
        </div>

        <div>
          <h1 className="text-3xl text-white mt-16 mb-5">Reviews</h1>

          {reviews.length === 0 ? (
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
              {reviews.map((detail: Reviews) => {
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

          <div className="grid sm:grid-cols-3 grid-cols-3 justify-center md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recommendedFilms.map((film) => {
              return (
                <div
                  key={film.id}
                  className="cursor-pointer hover:scale-105 transition-all relative group"
                >
                  <Link to={`/${film.id}`}>
                    <div>
                      <img
                        className="rounded-sm"
                        src={`${imageBaseURL}${film.poster_path}`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-55 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-lg font-bold">{film.title}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertainMovie;

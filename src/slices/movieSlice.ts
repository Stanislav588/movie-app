// movieSlice.ts

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Actors,
  MovieDetails,
  MovieInfo,
  UsersPropertys,
} from "../components/Movies/MovieInterface";
import { SeriesInfo } from "../components/Series/Series";
import { GeneralState } from "./SeriesState";
import { fetchContent } from "../features/contentThunk";
import { fetchTrailer } from "../features/TrailerThunk";
import { fetchRecommendContent } from "../features/RecommendContentThunk";

import { fetchReviews } from "../features/ReviewsThunk";
import { fetchActors } from "../features/ActorsThunk";

const initialState: GeneralState = {
  movies: JSON.parse(localStorage.getItem("movies") || "[]") as MovieInfo[],
  users: JSON.parse(
    localStorage.getItem("users") || "{}"
  ) as UsersPropertys | null,
  movieDetails: null,
  series: JSON.parse(localStorage.getItem("series") || "[]") as SeriesInfo[],
  actors: [],
  allActorsDetails: [],
  reviews: null,
  recommendations: null,
  popularSeries: null,
  topRatedSeries: null,
  onTheAirSeries: null,
  trailer: null,
  trailerStatus: "idle",
  trailerError: null,
  status: "idle",
  recommendContentStatus: "idle",
  recommendContentError: null,
  reviewsError: null,
  reviewsStatus: "idle",
  actorsStatus: "idle",
  actorsError: null,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateSeries(state, action: PayloadAction<SeriesInfo[] | null>) {
      state.series = action.payload;
      localStorage.setItem("series", JSON.stringify(action.payload));
    },
    updateChoosedMovie(state, action: PayloadAction<MovieDetails[] | null>) {
      state.movieDetails = action.payload;
      localStorage.setItem("movie-details", JSON.stringify(action.payload));
    },
    updateUserInfo(state, action: PayloadAction<UsersPropertys | null>) {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
    updateMovies(state, action: PayloadAction<MovieInfo[] | null>) {
      state.movies = action.payload;
      localStorage.setItem("movies", JSON.stringify(action.payload));
    },
    resetProfile(state) {
      state.users = null;
      localStorage.removeItem("users");
    },
    updateActorsDetails(state, action: PayloadAction<Actors[]>) {
      state.allActorsDetails = action.payload;
      localStorage.setItem("actorsDetails", JSON.stringify(action.payload));
    },

    updatePopularSeries(state, action: PayloadAction<SeriesInfo[]>) {
      state.popularSeries = action.payload;
      localStorage.setItem("popularSeries", JSON.stringify(action.payload));
    },
    updateTopRatedSeries(state, action: PayloadAction<SeriesInfo[]>) {
      state.topRatedSeries = action.payload;
      localStorage.setItem("topRatedSeries", JSON.stringify(action.payload));
    },
    updateOnTheAirSeries(state, action: PayloadAction<SeriesInfo[]>) {
      state.onTheAirSeries = action.payload;
      localStorage.setItem("onTheAirSeries", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const { response, isMovie } = action.payload;
        if (isMovie) {
          state.movieDetails = response;
          localStorage.setItem("movie-details", JSON.stringify(response));
        } else {
          state.series = response;
          localStorage.setItem("series", JSON.stringify(response));
        }
        state.status = "succeeded";
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTrailer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        const { response } = action.payload;
        state.trailer = response;
        state.trailerStatus = "succeeded";
        localStorage.setItem("trailer", JSON.stringify(response));
      })
      .addCase(fetchTrailer.rejected, (state, action) => {
        state.trailerStatus = "failed";
        state.trailerError = action.payload;
      })
      .addCase(fetchRecommendContent.pending, (state) => {
        state.recommendContentStatus = "loading";
      })
      .addCase(fetchRecommendContent.fulfilled, (state, action) => {
        const { response } = action.payload;
        state.recommendations = response;
        localStorage.setItem("recommendations", JSON.stringify(response));
      })
      .addCase(fetchRecommendContent.rejected, (state, action) => {
        state.recommendContentStatus = "failed";
        state.recommendContentError = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviewsStatus = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.reviews = data;
        localStorage.setItem("reviews", JSON.stringify(data));
        state.reviewsStatus = "succeeded";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviewsError = action.payload;
        state.reviewsStatus = "failed";
      })
      .addCase(fetchActors.pending, (state, action) => {
        state.actorsStatus = "loading";
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.actors = data;
        state.actorsStatus = "succeeded";
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.actorsStatus = "failed";
        state.actorsError = action.payload;
      });
  },
});

export const {
  updateUserInfo,
  updateChoosedMovie,
  resetProfile,
  updateMovies,
  updateActorsDetails,
  updateTopRatedSeries,
  updateSeries,
  updatePopularSeries,

  updateOnTheAirSeries,
} = movieSlice.actions;
export default movieSlice.reducer;

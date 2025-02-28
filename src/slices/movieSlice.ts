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
  movieDetails: {
    data: null,
    status: "idle",
    error: null,
  },
  series: {
    data: JSON.parse(localStorage.getItem("series") || "[]") as SeriesInfo[],
    status: "idle",
    error: null,
  },
  actors: {
    data: [],
    status: "idle",
    error: null,
  },
  allActorsDetails: [],
  reviews: {
    data: null,
    status: "idle",
    error: null,
  },
  recommendContent: {
    data: null,
    status: "idle",
    error: null,
  },
  popularSeries: null,
  topRatedSeries: null,
  onTheAirSeries: null,
  trailer: {
    data: null,
    status: "idle",
    error: null,
  },
  status: "idle",
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
    // updateChoosedMovie(state, action: PayloadAction<MovieDetails[] | null>) {
    //   state.movieDetails = action.payload;
    //   localStorage.setItem("movie-details", JSON.stringify(action.payload));
    // },
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
    // updateOnTheAirSeries(state, action: PayloadAction<SeriesInfo[]>) {
    //   state.onTheAirSeries = action.payload;
    //   localStorage.setItem("onTheAirSeries", JSON.stringify(action.payload));
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state, action) => {
        const isMovie = action.meta.arg?.isMovie || false;
        if (isMovie) {
          state.movieDetails.status = "loading";
          state.movieDetails.data = null;
        } else {
          state.series.data = null;
          state.series.status = "loading";
        }
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const { response, isMovie } = action.payload;
        if (isMovie) {
          state.movieDetails.data = response;
          localStorage.setItem("movie-details", JSON.stringify(response));
          state.movieDetails.status = "succeeded";
        } else {
          state.series.data = response;
          localStorage.setItem("series", JSON.stringify(response));
          state.series.status = "succeeded";
        }
      })
      .addCase(fetchContent.rejected, (state, action) => {
        const { isMovie } = action.payload;
        if (isMovie) {
          state.movieDetails.status = "failed";
        } else {
          state.series.status = "failed";
        }
      })
      .addCase(fetchTrailer.pending, (state) => {
        state.status = "loading";
        state.trailer.data = null;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        const { response } = action.payload;
        state.trailer.data = response;
        state.trailer.status = "succeeded";
        localStorage.setItem("trailer", JSON.stringify(response));
      })
      .addCase(fetchTrailer.rejected, (state, action) => {
        state.trailer.status = "failed";
        state.trailer.error = action.payload;
      })
      .addCase(fetchRecommendContent.pending, (state) => {
        state.recommendContent.status = "loading";
        state.recommendContent.data = null;
      })
      .addCase(fetchRecommendContent.fulfilled, (state, action) => {
        const { response } = action.payload;
        state.recommendContent.data = action.payload;
        localStorage.setItem("recommendations", JSON.stringify(response));
      })
      .addCase(fetchRecommendContent.rejected, (state, action) => {
        state.recommendContent.status = "failed";
        state.recommendContent.error = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviews.status = "loading";
        state.reviews.data = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.reviews.data = data;
        localStorage.setItem("reviews", JSON.stringify(data));
        state.reviews.status = "succeeded";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviews.error = action.payload;
        state.reviews.status = "failed";
      })
      .addCase(fetchActors.pending, (state) => {
        state.actors.status = "loading";
        state.actors.data = [];
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.actors.data = data;
        state.actors.status = "succeeded";
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.actors.status = "failed";
        state.actors.error = action.payload;
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

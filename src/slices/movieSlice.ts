// movieSlice.ts

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Actors,
  MovieDetails,
  MovieInfo,
  Reviews,
  UsersPropertys,
} from "../components/Movies/MovieInterface";
import { SeriesInfo } from "../components/Series/Series";
import { GeneralState } from "./SeriesState";
import fetchingData, {
  getContentDetails,
  getSeriesDetails,
} from "../services/api";

const initialState: GeneralState = {
  movies: JSON.parse(localStorage.getItem("movies") || "[]") as MovieInfo[],
  users: JSON.parse(localStorage.getItem("users") || "{}") as
    | UsersPropertys[]
    | null,
  movieDetails: null,
  series: JSON.parse(localStorage.getItem("series") || "[]") as SeriesInfo[],
  actors: [],
  allActorsDetails: [],
  reviews: null,
  recommendations: null,
  popularSeries: null,
  topRatedSeries: null,
  onTheAirSeries: null,
};

export const fetchContent = createAsyncThunk(
  "series/fetchSeries",
  async (
    { isMovie, id }: { isMovie: boolean; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = isMovie
        ? await getContentDetails(id)
        : await getSeriesDetails(id);

      return { response, isMovie };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    updateUserInfo(state, action: PayloadAction<UsersPropertys[] | null>) {
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
    updateActors(state, action: PayloadAction<Actors[]>) {
      state.actors = action.payload;
      localStorage.setItem("actors", JSON.stringify(action.payload));
    },
    updateReviews(state, action: PayloadAction<Reviews[]>) {
      state.reviews = action.payload;
      localStorage.setItem("reviews", JSON.stringify(action.payload));
    },
    updateRecommendations(state, action: PayloadAction<MovieInfo[]>) {
      state.recommendations = action.payload;
      localStorage.setItem("recommendations", JSON.stringify(action.payload));
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
      });
  },
});

export const {
  updateUserInfo,
  updateChoosedMovie,
  resetProfile,
  updateMovies,
  updateActors,
  updateRecommendations,
  updateReviews,
  updateActorsDetails,
  updateTopRatedSeries,
  updateSeries,
  updatePopularSeries,
  updateOnTheAirSeries,
} = movieSlice.actions;
export default movieSlice.reducer;

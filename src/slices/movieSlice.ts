// movieSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import MoviePropertys, {
  UsersPropertys,
} from "../components/Movies/MovieInterface";

const initialState = {
  favorites: [],
  movies: JSON.parse(
    localStorage.getItem("movies") || "[]"
  ) as MoviePropertys[],
  users: JSON.parse(localStorage.getItem("users") || "{}") as
    | UsersPropertys[]
    | null,
  movieDetails: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateChoosedMovie(state, action) {
      state.movieDetails = action.payload;
      localStorage.setItem("movie-details", JSON.stringify(action.payload));
    },
    updateUserInfo(state, action) {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
    updateMovies(state, action) {
      state.movies = action.payload;
      localStorage.setItem("movies", JSON.stringify(action.payload));
    },
    resetProfile(state) {
      state.users = null;
      localStorage.removeItem("users");
    },
    updateFavorites(state, action) {
      state.favorites = action.payload;
      localStorage.setItem("favorites", JSON.stringify(action.payload));
    },
  },
});

export const {
  updateUserInfo,
  updateChoosedMovie,
  resetProfile,
  updateMovies,
  updateFavorites,
} = movieSlice.actions;
export default movieSlice.reducer;

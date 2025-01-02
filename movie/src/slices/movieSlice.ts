import { createSlice } from "@reduxjs/toolkit";
import MoviePropertys from "../components/Movies/MovieInterface";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  movies: JSON.parse(
    localStorage.getItem("movies") || "[]"
  ) as MoviePropertys[],
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      state.users = action.payload;
    },
    updateMovies(state, action) {
      state.movies = action.payload;
    },
    resetProfile(state) {
      state.users = null;
    },
  },
});

export default movieSlice.reducer;
export const { updateUserInfo, resetProfile, updateMovies } =
  movieSlice.actions;

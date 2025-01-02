import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
  },
});

export default movieSlice.reducer;
export const { updateUserInfo, updateMovies } = movieSlice.actions;

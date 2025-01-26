import { createAsyncThunk } from "@reduxjs/toolkit";
import { getReviews, getSeriesReviews } from "../services/api";
import { Reviews } from "../components/Movies/MovieInterface";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchContent",
  async (
    {
      id,
      isMovie,
    }: {
      isMovie: boolean;
      id: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      if (isMovie) {
        const res = await getReviews(id);
        const transformedMovieReviews = res.map((movie: Reviews) => ({
          ...movie,
          content: movie.content.slice(0, 100) + "...",
        }));
        return { data: transformedMovieReviews, isMovie };
      } else {
        const res = await getSeriesReviews(id);
        const transformedSeriesReviews = res.map((movie: Reviews) => ({
          ...movie,
          content: movie.content.slice(0, 100) + "...",
        }));
        return { data: transformedSeriesReviews, isMovie };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieVideos, getSeriesTrailer } from "../services/api";

export const fetchTrailer = createAsyncThunk(
  "trailer/fetchContent",
  async (
    { id, isMovie }: { isMovie: boolean; id: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = isMovie
        ? await fetchMovieVideos(id)
        : await getSeriesTrailer(id);

      return { response, isMovie };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

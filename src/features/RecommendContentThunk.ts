import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecommendations, getSeriesRecomendations } from "../services/api";

export const fetchRecommendContent = createAsyncThunk(
  "recommendContent/fetchContent",
  async (
    { id, isMovie }: { isMovie: boolean; id: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = isMovie
        ? await getRecommendations(id)
        : await getSeriesRecomendations(id);
      if (response) {
        window.scrollTo(0, 0);
      }

      return { response, isMovie };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContentDetails, getSeriesDetails } from "../services/api";

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async (
    {
      id,
      isMovie,
    }: { isMovie: boolean; id: string | undefined; rejectWithValue: string },
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

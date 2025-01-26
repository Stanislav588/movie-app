import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCredits, getSeriesCredits } from "../services/api";

export const fetchActors = createAsyncThunk(
  "actors/fetchContent",
  async (
    { id, isMovie }: { isMovie: boolean; id: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      if (isMovie) {
        const res = await fetchCredits(id);
        return { data: res.cast };
      } else {
        const res = await getSeriesCredits(id);
        return { data: res.cast };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

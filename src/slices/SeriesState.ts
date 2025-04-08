import {
  Actors,
  MovieDetails,
  MovieInfo,
  Reviews,
  Trailer,
  UsersPropertys,
} from "../components/Movies/MovieInterface";
import { SeriesInfo } from "../components/Series/Series";

export interface GeneralState {
  popularSeries: SeriesInfo[] | null;
  topRatedSeries: SeriesInfo[] | null;
  onTheAirSeries: SeriesInfo[] | null;
  movies: MovieInfo[] | null;
  trailer: {
    data: Trailer[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };

  status: string | null;
  actorsStatus: string | null;
  actorsError: any | null;
  series: {
    data: SeriesInfo[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  error: any | null;

  reviewsError: any | null;
  recommendContent: {
    data: MovieInfo[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  reviewsStatus: string;
  allActorsDetails: Actors[] | null;
  movieDetails: {
    data: MovieDetails[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  reviews: {
    data: Reviews[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };

  actors: {
    data: Actors[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  users: UsersPropertys | null;
}

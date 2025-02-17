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
  trailer: Trailer[] | null;
  trailerStatus: string | null;
  trailerError: any;
  status: string | null;
  actorsStatus: string | null;
  actorsError: any | null;
  series: SeriesInfo[] | null;
  error: any | null;
  recommendContentStatus: string;
  recommendContentError: any | null;
  reviewsError: any | null;
  reviewsStatus: string;
  allActorsDetails: Actors[] | null;
  movieDetails: MovieDetails[] | null;
  reviews: Reviews[] | null;
  recommendations: MovieInfo[] | null;
  actors: Actors[] | null;
  users: UsersPropertys | null;
}

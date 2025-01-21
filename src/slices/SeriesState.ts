import {
  Actors,
  MovieDetails,
  MovieInfo,
  Reviews,
  UsersPropertys,
} from "../components/Movies/MovieInterface";
import { SeriesInfo } from "../components/Series/Series";

export interface GeneralState {
  popularSeries: SeriesInfo[] | null;
  topRatedSeries: SeriesInfo[] | null;
  onTheAirSeries: SeriesInfo[] | null;
  movies: MovieInfo[] | null;
  series: SeriesInfo[] | null;
  allActorsDetails: Actors[] | null;
  movieDetails: MovieDetails[] | null;
  reviews: Reviews[] | null;
  recommendations: MovieInfo[] | null;
  actors: Actors[] | null;
  users: UsersPropertys[] | null;
}

import {
  ProductCompanies,
  SeriesInfo,
  SpokenLanguages,
} from "../Series/Series";

export interface MovieInfo {
  name: string;
  title: string;
  media_type: string;
  backdrop_path: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  runtime: number;
  id: string;
  vote_average: string;
  vote_count: number;
}

export interface Genres {
  name: string;
  id: number;
}
export interface User {
  createdAt: number;
  email: string;
  favorites: [];
  fullName: string;
  profilePicture: string;
  uid: string;
  username: string;
}
export interface UsersPropertys {
  createdAt: number;
  email: string;
  favorites: [];
  fullName: string;
  profilePicture: string;
  uid: string;
  username: string;
}
export interface recommendedFilms {
  poster_path: string;
  id: number;
  title: string;
}
export interface ContentInfo {
  id: string;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  origin_country: string;
  popularity: number;
  title: string;
  runtime: number;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  number_of_episodes: number;
  name: string;
  genres: Genres[];
  spoken_languages: SpokenLanguages[];
  video: boolean;
  production_companies: ProductCompanies[];
  vote_average: string;
  vote_count: number;
}
interface SeriesActors {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export interface MovieDetails extends ContentInfo {
  title: string;
  runtime: number;
  release_date: string;
}

export interface MovieState {
  movieDetails: MovieDetails;
  users: User;
  movies: MovieInfo;
  series: SeriesInfo;
  actors: SeriesActors;
  reviews: Reviews;
  searchedMovies: MovieInfo[];
  popularSeries: SeriesInfo[];
  allActorsDetails: Actors[];
  recommendations: MovieInfo[];
  onTheAirSeries: SeriesInfo[];
  topRatedSeries: SeriesInfo[];
}
export interface RootState {
  movie: MovieState;
}
export interface Reviews {
  author: string;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
export interface Actors {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

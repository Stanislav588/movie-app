interface MoviePropertys {
  name: string;
  title: string;
  media_type: string;
  backdrop_path: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  id: string;
  vote_average: string;
  vote_count: number;
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
export interface MovieDetails {
  id: string;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  origin_country: string;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  title: string;
  runtime: number;
  genres: { name: string; id: number }[];
  spoken_languages: { name: string }[];
  video: boolean;
  production_companies: { name: string; id: number }[];
  vote_average: string;
  vote_count: number;
}
export interface MovieState {
  movieDetails: MovieDetails;
  users: User;
  movies: MoviePropertys[];
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
export default MoviePropertys;

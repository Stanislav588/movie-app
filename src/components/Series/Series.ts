import { Genres } from "../Movies/MovieInterface";

export interface ProductCompanies {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}
export interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface SeriesInfo {
  first_air_date: string;
  number_of_seasons: number;
  episode_run_time: number;
  seasons: number;
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

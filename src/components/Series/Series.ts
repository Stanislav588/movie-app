import { ContentInfo, MovieDetails } from "../Movies/MovieInterface";

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

export interface SeriesInfo extends ContentInfo {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
}
export type MovieOrSeries = MovieDetails | SeriesInfo;

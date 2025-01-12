interface FilterMovies {
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
export interface SortOption {
  label: string;
  value: string;
}
export interface Genres {
  id: number;
  name: string;
}
export interface Countries {
  iso_3166_1: string;
  name: string;
}

export interface Header {
  name: string;
  id: number;
  link: string;
}
export default FilterMovies;

export interface Videos {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: true;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

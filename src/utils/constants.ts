import {
  Countries,
  Genres,
  Header,
  SortOption,
} from "../components/FilterMenu/FilterMovies";

export const genresList: Genres[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "Historical" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10402, name: "Musical" },
  { id: 99, name: "Documentary" },
  { id: 10751, name: "Family" },
  { id: 10402, name: "Music" },
  { id: 21, name: "Sport" },
];

export const countryList: Countries[] = [
  { iso_3166_1: "ES", name: "Spain" },
  { iso_3166_1: "GB", name: "United Kingdom" },
  { iso_3166_1: "ES", name: "United States" },
  { iso_3166_1: "DE", name: "Germany " },
  { iso_3166_1: "CA", name: "Canada" },
  { iso_3166_1: "AU", name: "Australia" },
  { iso_3166_1: "IT", name: "Italy" },
  { iso_3166_1: "IN", name: "India" },
  { iso_3166_1: "JP", name: "Japan" },
  { iso_3166_1: "CN", name: "China" },
  { iso_3166_1: "MX", name: "Mexico" },
  { iso_3166_1: "KR", name: "South Korea" },
];

export const sortedBy: SortOption[] = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Highest Rated", value: "vote_average.desc" },
];

export const headerComponents: Header[] = [
  {
    name: "Home",
    id: 1,
    link: "/",
  },
  {
    name: "WatchList",
    id: 2,
    link: "/favorites",
  },
  {
    name: "Catalog",
    id: 3,
    link: "/catalog",
  },
];

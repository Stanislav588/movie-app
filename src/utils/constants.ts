import {
  Countries,
  Genres,
  Header,
  SeriesGenres,
  SortOption,
} from "../components/FilterMenu/FilterMovies";
import instagram from "../images/instagram-white.png";
import gitHub from "../images/git.png";
import linkedin from "../images/linkedin-white.png";
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
];
export const listOfSeriesGenres: SeriesGenres[] = [
  { id: 28, name: "Action", icon: "" },
  { id: 12, name: "Adventure", icon: "" },
  {
    id: 16,
    name: "Animation",
    icon: "",
  },
  {
    id: 35,
    name: "Comedy",
    icon: "fa-solid fa-face-laugh",
  },
  {
    id: 80,
    name: "Crime",
    icon: "fa-solid fa-handcuffs",
  },
  {
    id: 18,
    name: "Drama",
    icon: "fa-solid fa-face-sad-tear",
  },
  {
    id: 14,
    name: "Fantasy",
    icon: "fa-solid fa-face-laugh",
  },
  { id: 36, name: "Historical", icon: "fa-solid fa-tower-observation" },
  { id: 27, name: "Horror", icon: "" },
  { id: 9648, name: "Mystery", icon: "fa-brands fa-suse" },
  { id: 10749, name: "Romance", icon: "fa-solid fa-heart-pulse" },
  { id: 53, name: "Thriller", icon: "" },
  { id: 10752, name: "War", icon: "" },
  { id: 37, name: "Western", icon: "fa-solid fa-hat-cowboy" },
  { id: 10402, name: "Musical", icon: "" },
  { id: 99, name: "Documentary", icon: "fa-solid fa-book" },
  { id: 10751, name: "Family", icon: "fa-solid fa-people-group" },
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
    name: "Series",
    id: 4,
    link: "/series",
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
export const footerEl = [
  {
    id: 3,
    icon: gitHub,
    link: "https://github.com/Stanislav588",
  },
];

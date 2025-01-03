import {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FilterMovies, {
  SortOption,
  Videos,
} from "../components/FilterMenu/FilterMovies";
import fetchingData, {
  fetchMoviesBy,
  fetchMoviesByGenre,
  searchMovieByName,
} from "../services/api";
import { genresList } from "../utils/constants";
import { sortedBy } from "../utils/constants";
import { Reviews } from "../components/Movies/MovieInterface";

export interface MovieContextType {
  isOpenCategory: boolean;
  setIsOpenCategory: (prev: any) => void;
  sortedMovies: string;
  setSortedMovies: (value: string) => void;
  sortedMoviesLabel: string;
  handleSortedMoviesBy: (selected: string, label: string) => void;
  setSortedMoviesLabel: (value: string) => void;
  sortedBy: SortOption[];
  genresList: { id: number; name: string }[];
  isOpenGenres: boolean;
  isSearchByNameLoading: boolean;
  genresLabel: string;
  setGenresLabel: (label: string) => void;
  setIsOpenGenres: React.Dispatch<React.SetStateAction<boolean>>;
  genres: number;
  searchMovie: string;
  setSearchMovie: (select: string) => void;
  handleGenres: (selected: number, label: string) => void;
  setGenres: (value: number) => void;
  movies: FilterMovies[];
  setMovies: Dispatch<SetStateAction<FilterMovies[]>>;
  searchedMovieByNameData: FilterMovies[];
  isLoading: boolean;
  movieVideosData: Videos[];
  setMovieVideosData: Dispatch<SetStateAction<Videos[]>>;
  reviews: Reviews[];
  setReviews: Dispatch<SetStateAction<Reviews[]>>;
}
export const MovieContext = createContext<MovieContextType>(
  {} as MovieContextType
);

export const MovieProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Loading states
  const [isSearchByNameLoading, setIsSearchByNameIsLoading] =
    useState<boolean>(false);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // ============

  const [moviesByCountriesLabel, setMoviesByCountriesLabel] =
    useState<string>("Country");
  const [searchedMovieByNameData, setSearchedMovieByNameData] = useState<[]>(
    []
  );
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [isOpenGenres, setIsOpenGenres] = useState<boolean>(false);
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [genres, setGenres] = useState<number>(18);
  const [movieVideosData, setMovieVideosData] = useState<Videos[]>([]);
  const [genresLabel, setGenresLabel] = useState<string>("Genres");
  const [sortedMovies, setSortedMovies] = useState<string>("Sorted By");
  const [sortedMoviesLabel, setSortedMoviesLabel] =
    useState<string>("Popularity");
  const [movies, setMovies] = useState<FilterMovies[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);

  // Fetching Movies By Genre
  useEffect(() => {
    const fetchingMoviesByGenre = async () => {
      setIsLoadingGenres(true);

      try {
        const res = await fetchMoviesByGenre(genres);
        setMovies(res);
      } catch (error) {
        console.log("Error fetching by genre :", error);
      } finally {
        setIsLoadingGenres(false);
      }
    };
    fetchingMoviesByGenre();
  }, [genres]);

  // ========================

  // Fetching default Movies
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetchingData();
        setMovies(res);
        localStorage.setItem("movies", JSON.stringify(res));
        console.log("Rated movies : ", res);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // ==================

  // Fetching movies by Name
  useEffect(() => {
    const searchByName = async () => {
      setIsSearchByNameIsLoading(true);
      try {
        const res = await searchMovieByName(searchMovie);
        setSearchedMovieByNameData(res), console.log(res);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setIsSearchByNameIsLoading(false);
      }
    };

    searchByName();
  }, [searchMovie]);
  // ===================

  // Fetching Sorted Movies
  useEffect(() => {
    const fetchingMovies = async () => {
      try {
        const res = await fetchMoviesBy(sortedMovies);
        setMovies(res);
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    fetchingMovies();
  }, [sortedMovies]);

  // ===================

  function handleGenres(selected: number, label: string) {
    setGenres(selected);
    setGenresLabel(label);
  }
  function handleSortedMoviesBy(selected: string, label: string) {
    setSortedMovies(selected);
    setSortedMoviesLabel(label);
  }

  return (
    <MovieContext.Provider
      value={{
        isOpenCategory,
        movieVideosData,
        setMovieVideosData,
        setIsOpenCategory,
        sortedMovies,
        setSortedMovies,
        setMovies,
        movies,
        sortedMoviesLabel,
        isSearchByNameLoading,
        setSortedMoviesLabel,
        searchedMovieByNameData,
        sortedBy,
        setSearchMovie,
        handleSortedMoviesBy,
        searchMovie,
        genresList,
        isOpenGenres,
        setIsOpenGenres,
        genres,
        isLoading,
        setGenres,
        setReviews,
        handleGenres,
        genresLabel,
        setGenresLabel,
        reviews,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

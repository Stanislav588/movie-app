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
import { useDispatch } from "react-redux";
import { updateMovies } from "../slices/movieSlice";

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

  const [searchedMovieByNameData, setSearchedMovieByNameData] = useState<[]>(
    []
  );

  const [searchMovie, setSearchMovie] = useState<string>("");
  const [isOpenGenres, setIsOpenGenres] = useState<boolean>(false);
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [genres, setGenres] = useState<number>(28);
  const [movieVideosData, setMovieVideosData] = useState<Videos[]>([]);
  const [genresLabel, setGenresLabel] = useState<string>("Action");
  const [sortedMovies, setSortedMovies] = useState<string>("Sorted By");
  const [sortedMoviesLabel, setSortedMoviesLabel] =
    useState<string>("Popularity");
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const dispatch = useDispatch();

  // Fetching Movies By Genre
  useEffect(() => {
    let isCancelled = false;
    const fetchingMoviesByGenre = async () => {
      setIsLoadingGenres(true);
      try {
        const res = await fetchMoviesByGenre(genres);
        if (!isCancelled) {
          dispatch(updateMovies(res));
        }
      } catch (error) {
        if (!isCancelled) {
          console.log("Error fetching by genre :", error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingGenres(false);
        }
      }
    };
    fetchingMoviesByGenre();
    return () => {
      isCancelled = true;
    };
  }, [genres]);

  // ========================

  // Fetching default Movies
  useEffect(() => {
    let isCancelled = false;
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetchingData();
        if (!isCancelled) {
          dispatch(updateMovies(res));
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching movies:", error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();
    return () => {
      isCancelled = true;
    };
  }, []);

  // ==================

  // Fetching movies by Name
  useEffect(() => {
    let isCancelled = false;
    const searchByName = async () => {
      setIsSearchByNameIsLoading(true);
      try {
        const res = await searchMovieByName(searchMovie);
        if (!isCancelled) {
          setSearchedMovieByNameData(res);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching movie:", error);
        }
      } finally {
        if (!isCancelled) {
          setIsSearchByNameIsLoading(false);
        }
      }
    };

    searchByName();
    return () => {
      isCancelled = true;
    };
  }, [searchMovie]);
  // ===================

  // Fetching Sorted Movies
  useEffect(() => {
    let isCancelled = false;
    const fetchingMovies = async () => {
      try {
        const res = await fetchMoviesBy(sortedMovies);
        if (!isCancelled) {
          dispatch(updateMovies(res));
        }
      } catch (error) {
        if (!isCancelled) {
          console.log("Error : ", error);
        }
      }
    };
    fetchingMovies();
    return () => {
      isCancelled = true;
    };
  }, [sortedMovies]);

  // ===================

  function handleGenres(selected: number, label: string) {
    setGenres(selected);
    setGenresLabel(label);
    localStorage.setItem(
      "genres",
      JSON.stringify({ id: selected, name: label })
    );
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

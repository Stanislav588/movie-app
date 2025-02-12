import React, {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { SortOption, Videos } from "../components/FilterMenu/FilterMovies";

import { genresList } from "../utils/constants";
import { sortedBy } from "../utils/constants";
import {
  Genres,
  MovieInfo,
  Reviews,
} from "../components/Movies/MovieInterface";
import { useDispatch } from "react-redux";
import { updateMovies } from "../slices/movieSlice";
import { fetchMoviesBy, getAgeMovie } from "../services/api";
import { enqueueSnackbar } from "notistack";

export interface MovieContextType {
  isOpenCategory: boolean;
  isOpenGenres: boolean;
  isOpenFilterAgeMenu: boolean;
  setIsOpenCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenGenres: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenFilterAgeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  sortedMovies: string;
  setSortedMovies: (value: string) => void;
  sortedMoviesLabel: string;
  handleSortedMoviesBy: (selected: string, label: string) => void;
  setSortedMoviesLabel: (value: string) => void;
  sortedBy: SortOption[];
  genresList: Genres[];

  genresLabel: string;
  setGenresLabel: (label: string) => void;

  genres: number;
  searchMovie: string;
  localState: MovieInfo[];
  setLocalState: Dispatch<SetStateAction<MovieInfo[]>>;
  setSearchMovie: (select: string) => void;
  handleGenres: (selected: number, label: string) => void;
  setGenres: (value: number) => void;
  movieDataByName: MovieInfo[];
  setMovieDataByName: Dispatch<SetStateAction<MovieInfo[]>>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isLoadingGenres: boolean;
  setIsLoadingGenres: (value: boolean) => void;
  movieVideosData: Videos[];
  setMovieVideosData: Dispatch<SetStateAction<Videos[]>>;
  reviews: Reviews[];
  isLoadingSearchMovieName: boolean;
  setIsLoadingSearchMovieName: (value: boolean) => void;
  setReviews: Dispatch<SetStateAction<Reviews[]>>;
  seriesGenres: number;
  handleSeriesGenres: (selected: number) => void;
  setSeriesGenres: (selected: number) => void;
  scrollLeft: (index: string) => void;
  scrollRight: (index: string) => void;
  scrollContainer: React.MutableRefObject<
    Record<string, HTMLDivElement | null>
  >;
  handleFilterByGenresAndAges: (selectedAge: number, label: string) => void;
  ageLabel: string;
  handleOpenFilterCategory: () => void;
  handleOpenFilterGenres: () => void;
  handleOpenFilterAge: () => void;
}
export const MovieContext = createContext<MovieContextType>(
  {} as MovieContextType
);

export const MovieProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Loading states
  const dispatch = useDispatch();
  const [seriesGenres, setSeriesGenres] = useState<number>(0);
  const [ages, setAges] = useState(2024);
  const [ageLabel, setAgeLabel] = useState("Choose the year");
  const [localState, setLocalState] = useState<MovieInfo[]>([]);
  const [isLoadingSearchMovieName, setIsLoadingSearchMovieName] =
    useState<boolean>(false);
  const [movieDataByName, setMovieDataByName] = useState<MovieInfo[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // ============

  const [searchMovie, setSearchMovie] = useState<string>("");
  const [isOpenGenres, setIsOpenGenres] = useState<boolean>(false);
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [isOpenFilterAgeMenu, setIsOpenFilterAgeMenu] =
    useState<boolean>(false);
  const [genres, setGenres] = useState<number>(28);
  const [movieVideosData, setMovieVideosData] = useState<Videos[]>([]);
  const [genresLabel, setGenresLabel] = useState<string>("Action");
  const [sortedMovies, setSortedMovies] = useState<string>("Sorted By");
  const [sortedMoviesLabel, setSortedMoviesLabel] =
    useState<string>("Popularity");
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const scrollContainer = useRef<Record<string, HTMLDivElement>>({});

  const scrollLeft = (index: string) => {
    if (scrollContainer.current[index]) {
      scrollContainer.current[index].scrollLeft -= 1000;
    }
  };
  const scrollRight = (index: string) => {
    if (scrollContainer.current[index]) {
      scrollContainer.current[index].scrollLeft += 1000;
    }
  };

  function handleGenres(selected: number, label: string) {
    setGenres(selected);
    setGenresLabel(label);
    localStorage.setItem(
      "genres",
      JSON.stringify({ id: selected, name: label })
    );
  }
  function handleSeriesGenres(selected: number) {
    setSeriesGenres(selected);
    localStorage.setItem("series-genres", JSON.stringify({ id: selected }));
  }
  function handleSortedMoviesBy(selected: string, label: string) {
    setSortedMovies(selected);
    setSortedMoviesLabel(label);
    localStorage.setItem(
      "category",
      JSON.stringify({ id: selected, name: label })
    );
  }

  function handleFilterByGenresAndAges(selectedAge: number, label: string) {
    setAges(selectedAge);
    setAgeLabel(label);
    localStorage.setItem(
      "genre-age-filter",
      JSON.stringify({
        age: selectedAge,
        name: label,
      })
    );
  }

  function handleOpenFilterCategory() {
    setIsOpenCategory((prev) => !prev);
    setIsOpenGenres(false);
    setIsOpenFilterAgeMenu(false);
  }
  function handleOpenFilterGenres() {
    setIsOpenGenres((prev) => !prev);
    setIsOpenCategory(false);
    setIsOpenFilterAgeMenu(false);
  }
  function handleOpenFilterAge() {
    setIsOpenFilterAgeMenu((prev) => !prev);
    setIsOpenCategory(false);
    setIsOpenGenres(false);
  }

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
          enqueueSnackbar("Failed to fetching movies : ", { variant: "error" });
        }
      }
    };
    fetchingMovies();
    return () => {
      isCancelled = true;
    };
  }, [sortedMovies]);
  useEffect(() => {
    let isCancelled = false;
    const handleFetchingMoviesByGenre = async () => {
      setIsLoadingGenres(true);
      try {
        const res = await getAgeMovie(genres, ages);
        if (!isCancelled) {
          dispatch(updateMovies(res));
        }
      } catch (error) {
        if (!isCancelled) {
          enqueueSnackbar("Failed to fetching by genre :", {
            variant: "error",
          });
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingGenres(false);
        }
      }
    };
    handleFetchingMoviesByGenre();
    return () => {
      isCancelled = true;
    };
  }, [genres, ages]);

  return (
    <MovieContext.Provider
      value={{
        isOpenCategory,
        movieVideosData,
        setMovieVideosData,
        setIsOpenCategory,
        sortedMovies,
        setSortedMovies,
        seriesGenres,
        handleSeriesGenres,
        sortedMoviesLabel,
        isLoadingSearchMovieName,
        setIsLoadingSearchMovieName,
        setSortedMoviesLabel,
        movieDataByName,
        setMovieDataByName,
        sortedBy,
        setSearchMovie,
        localState,
        setLocalState,
        handleSortedMoviesBy,
        searchMovie,
        setIsLoading,
        genresList,
        isOpenGenres,
        setIsOpenGenres,
        genres,
        isLoadingGenres,
        setIsLoadingGenres,
        isLoading,
        setGenres,
        setReviews,
        handleGenres,
        genresLabel,
        setGenresLabel,
        reviews,
        scrollLeft,
        scrollRight,
        scrollContainer,
        handleFilterByGenresAndAges,
        ageLabel,
        ages,
        setAges,
        setAgeLabel,
        isOpenFilterAgeMenu,
        setIsOpenFilterAgeMenu,
        handleOpenFilterCategory,
        handleOpenFilterGenres,
        handleOpenFilterAge,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

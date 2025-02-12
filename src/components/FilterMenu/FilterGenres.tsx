import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/MovieContext";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import GenresMenu from "./GenresMenu";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
import { Genres } from "../Movies/MovieInterface";
import "./FilterMenu.css";
const FilterGenres = () => {
  const {
    genresList,
    genresLabel,
    handleGenres,
    setIsOpenGenres,
    isOpenGenres,
    handleOpenFilterGenres,
  } = useContext(MovieContext);

  useEffect(() => {
    try {
      const savedGenre = JSON.parse(localStorage.getItem("genres") || "{}");
      if (savedGenre && savedGenre.id && savedGenre.name) {
        handleGenres(savedGenre.id, savedGenre.name);
      }
    } catch (error) {
      enqueueSnackbar("Error loading genre from localStorage:", {
        variant: "error",
      });
    }
  }, []);

  return (
    <>
      <div
        onClick={handleOpenFilterGenres}
        className="filter-genres relative select-none"
      >
        <div className="flex cursor-pointer justify-between items-center  w-full">
          <h1
            onClick={() => setIsOpenGenres(true)}
            className="text-neutral-300"
          >
            {genresLabel}
          </h1>
          {isOpenGenres ? (
            <IoMdArrowDropup className="text-2xl text-white" />
          ) : (
            <IoMdArrowDropdown className="text-2xl text-white" />
          )}
        </div>
        {isOpenGenres && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="genres-container absolute w-[450px] hidden md:grid-cols-2 lg:grid-cols-3 md:grid gap-1 top-14 z-30"
          >
            {genresList.map((genre: Genres) => {
              return (
                <li
                  className="genres-menu text-white cursor-pointer transition-all hover:shadow-md  hover:shadow-red-500  px-2 py-1"
                  key={genre.name}
                >
                  <p
                    onClick={() => handleGenres(genre.id, genre.name)}
                    className=" px-2 rounded-md   pb-1 "
                  >
                    {genre.name}
                  </p>
                </li>
              );
            })}
          </motion.ul>
        )}
      </div>
      {isOpenGenres && <GenresMenu setIsOpenGenres={setIsOpenGenres} />}
    </>
  );
};

export default FilterGenres;

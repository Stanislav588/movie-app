import { FC, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import GenresMenu from "./GenresMenu";

const FilterGenres: FC = () => {
  const {
    genresList,
    genresLabel,
    handleGenres,
    isOpenGenres,
    setIsOpenGenres,
  } = useContext(MovieContext);

  return (
    <>
      <div
        onClick={() => setIsOpenGenres((prev) => !prev)}
        className="flex hover:bg-neutral-700   flex-col items-center  w-[250px]  border border-neutral-700 px-2 py-2  rounded-xl"
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
          <ul className="absolute text-neutral-300 hidden md:flex  z-10 max-w-[400px] transition-transform origin-top  top-16 flex-wrap gap-5 p-3 items-center bg-neutral-800 rounded-lg shadow-lg">
            {genresList.map((genre) => {
              return (
                <li
                  className="cursor-pointer transition-all hover:shadow-md  hover:shadow-yellow-500 border rounded-full px-2 py-1"
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
          </ul>
        )}
      </div>
      {isOpenGenres && <GenresMenu setIsOpenGenres={setIsOpenGenres} />}
    </>
  );
};

export default FilterGenres;

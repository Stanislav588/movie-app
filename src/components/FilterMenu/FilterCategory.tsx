import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { motion } from "framer-motion";
import { SortOption } from "./FilterMovies";
import "./FilterMenu.css";
const FilterCategory = () => {
  const {
    handleSortedMoviesBy,
    isOpenCategory,
    sortedMoviesLabel,
    sortedBy,
    handleOpenFilterCategory,
  } = useContext(MovieContext);

  return (
    <>
      <div
        onClick={handleOpenFilterCategory}
        className="filter-category dark:bg-blue-500  select-none relative"
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="text-neutral-300 dark:text-white">
            {sortedMoviesLabel}
          </h1>
          {isOpenCategory ? (
            <IoMdArrowDropup className="text-2xl text-white" />
          ) : (
            <IoMdArrowDropdown className="text-2xl text-white" />
          )}
        </div>

        {isOpenCategory && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="category-box dark:bg-blue-200 absolute text-neutral-300 w-[250px] z-40 top-12 left-0 flex flex-col gap-1 items-center bg-neutral-800 rounded-lg shadow-lg"
          >
            {sortedBy.map((item: SortOption) => {
              return (
                <li
                  onClick={() => handleSortedMoviesBy(item.value, item.label)}
                  key={item.value}
                  className="category-menu dark:bg-blue-500 dark:text-white cursor-pointer last:border-b-0  hover:shadow-red-500 hover:shadow-md transition-all w-full text-center py-2"
                >
                  {item.label}
                </li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </>
  );
};
export default FilterCategory;

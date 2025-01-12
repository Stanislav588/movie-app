import { FC, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { motion } from "framer-motion";

const FilterCategory: FC = () => {
  const {
    handleSortedMoviesBy,
    setIsOpenCategory,
    isOpenCategory,
    sortedMoviesLabel,
    sortedBy,
  } = useContext(MovieContext);

  return (
    <>
      <div
        onClick={() => setIsOpenCategory((prev: boolean) => !prev)}
        className="flex hover:bg-neutral-700  transition-all  flex-col items-center w-[250px]  cursor-pointer border border-neutral-700 px-2 py-2  rounded-xl"
      >
        <div className=" relative flex justify-between items-center  w-full">
          <h1 className="text-neutral-300">{sortedMoviesLabel}</h1>
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
            className="absolute text-neutral-300 w-[250px] z-40 text- top-16 left-8 flex flex-col items-center bg-neutral-800 rounded-lg shadow-lg"
          >
            {sortedBy.map((item) => {
              return (
                <li
                  onClick={() => handleSortedMoviesBy(item.value, item.label)}
                  key={item.value}
                  className="cursor-pointer border-b border-b-white last:border-b-0  hover:bg-neutral-600 transition-all w-full text-center py-2"
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

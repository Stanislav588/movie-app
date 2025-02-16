import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MovieContext } from "../../context/MovieContext";
import "./FilterMenu.css";
import AgeFilterMenu from "./AgeFilterMenu";
const FilterAge = () => {
  const arr = Array.from({ length: 30 }, (_, i) => 2025 - i);
  const [selectedYear, setSelectedYear] = useState<number[]>([]);
  const {
    handleFilterByGenresAndAges,
    isOpenFilterAgeMenu,
    ageLabel,
    handleOpenFilterAge,
    setIsOpenFilterAgeMenu,
  } = useContext(MovieContext);

  function handleOnChange(year: any) {
    setSelectedYear((prev) =>
      prev.includes(year) ? prev.filter((i) => i !== year) : [year]
    );
    handleFilterByGenresAndAges(year, year);
  }

  return (
    <div
      onClick={handleOpenFilterAge}
      className="filter-genres dark:bg-blue-500 relative select-none"
    >
      <div className="flex cursor-pointer justify-between items-center  w-full">
        <h1
          onClick={handleOpenFilterAge}
          className="text-neutral-300 dark:text-white"
        >
          {ageLabel}
        </h1>
        {isOpenFilterAgeMenu ? (
          <IoMdArrowDropup className="text-2xl text-white" />
        ) : (
          <IoMdArrowDropdown className="text-2xl text-white" />
        )}
      </div>
      {isOpenFilterAgeMenu && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="genres-container dark:bg-blue-200 absolute w-[100%] hidden overflow-y-auto md:grid-cols-2 lg:grid-cols-2 md:grid gap-1 top-14 z-30"
        >
          {arr.map((year) => {
            return (
              <li
                className="genres-menu text-white dark:bg-blue-500 cursor-pointer transition-all hover:shadow-md  hover:shadow-red-500  px-2 py-1"
                key={year}
              >
                <div className="flex items-center gap-2">
                  <input
                    onChange={() => handleOnChange(year)}
                    checked={selectedYear.includes(year)}
                    className="checkbox"
                    type="checkbox"
                  />
                  <p className="px-2 rounded-md">{year}</p>
                </div>
              </li>
            );
          })}
        </motion.ul>
      )}
      {isOpenFilterAgeMenu && (
        <AgeFilterMenu
          selectedYear={selectedYear}
          arr={arr}
          handleOnChange={handleOnChange}
          setIsOpenFilterAgeMenu={setIsOpenFilterAgeMenu}
        />
      )}
    </div>
  );
};

export default FilterAge;

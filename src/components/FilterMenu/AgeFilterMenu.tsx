import { FC, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { motion } from "framer-motion";

import "./FilterMenu.css";
interface AgeFilterMenuProps {
  setIsOpenFilterAgeMenu: (value: boolean) => void;
  selectedYear: number[];
  handleOnChange: (value: number) => void;
  arr: number[];
}
const AgeFilterMenu: FC<AgeFilterMenuProps> = ({
  selectedYear,
  handleOnChange,
  arr,
}) => {
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);
  const { handleFilterByGenresAndAges } = useContext(MovieContext);
  return (
    <div
      className={`fixed z-30 block md:hidden  min-h-screen bg-black bg-opacity-55 transition-all inset-0 
        `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 mb-10 left-0 right-0"
      >
        <motion.ul
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          className="age-filter-menu overflow-y-auto px-6 max-h-[500px]  grid grid-cols-2 text-center"
        >
          {arr.map((year: number) => {
            return (
              <li
                onClick={() =>
                  handleFilterByGenresAndAges(year, year.toString())
                }
                className="cursor-pointer rounded-xl transition-all  py-4 "
                key={year}
              >
                <div className="flex justify-center gap-4">
                  <input
                    onChange={() => handleOnChange(year)}
                    checked={selectedYear.includes(year)}
                    className="checkbox"
                    type="checkbox"
                  />
                  <h1 className="text-xl text-white">{year}</h1>
                </div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};

export default AgeFilterMenu;

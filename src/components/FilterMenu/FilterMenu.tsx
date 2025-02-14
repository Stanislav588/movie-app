import FilterAge from "./FilterAge";
import FilterCategory from "./FilterCategory";

import FilterGenres from "./FilterGenres";
import { motion } from "framer-motion";
import "./FilterMenu.css";
const FilterMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="filter-box"
    >
      <div className="flex flex-wrap justify-center md:justify-start  gap-5 ">
        <FilterCategory />
        <FilterGenres />
        <FilterAge />
      </div>
    </motion.div>
  );
};
export default FilterMenu;

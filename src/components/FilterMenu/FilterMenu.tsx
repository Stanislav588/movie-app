import FilterAge from "./FilterAge";
import FilterCategory from "./FilterCategory";

import FilterGenres from "./FilterGenres";
import "./FilterMenu.css";
const FilterMenu = () => {
  return (
    <div className="filter-box">
      <div className="flex flex-wrap justify-center md:justify-start  gap-5 ">
        <FilterCategory />
        <FilterGenres />
        <FilterAge />
      </div>
    </div>
  );
};
export default FilterMenu;

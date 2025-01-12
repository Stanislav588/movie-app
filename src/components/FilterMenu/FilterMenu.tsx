import { FC } from "react";
import FilterCategory from "./FilterCategory";
import FilterGenres from "./FilterGenres";

const FilterMenu: FC = () => {
  return (
    <div className="select-none rounded-xl mt-8 px-8 relative block mx-auto ">
      <div className="flex gap-5 ">
        <FilterCategory />
        <FilterGenres />
      </div>
    </div>
  );
};
export default FilterMenu;

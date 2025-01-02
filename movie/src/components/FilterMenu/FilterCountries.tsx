import { FC, useContext, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { countryList } from "../../utils/constants";
import { MovieContext } from "../../context/MovieContext";

const FilterCountries: FC = () => {
  const [isOpenCountries, setIsOpenCountries] = useState<boolean>(false);
  const {} = useContext(MovieContext);
  return (
    <div
      onClick={() => setIsOpenCountries((prev) => !prev)}
      className="flex hover:bg-neutral-700  transition-all  flex-col items-center w-[250px]  cursor-pointer border border-neutral-700 px-2 py-2  rounded-xl"
    >
      <div className="flex justify-between items-center  w-full">
        <h1 className="text-neutral-300"></h1>
        {isOpenCountries ? (
          <IoMdArrowDropup className="text-2xl text-white" />
        ) : (
          <IoMdArrowDropdown className="text-2xl text-white" />
        )}
      </div>

      {isOpenCountries && (
        <ul className="absolute text-neutral-300 w-[250px] text- top-16 left-4 flex flex-col items-center bg-neutral-800 rounded-lg shadow-lg">
          {countryList.map((item) => {
            return (
              <li
                // onClick={() => handleSortedMoviesBy(item.value, item.label)}
                key={item.name}
                className="cursor-pointer hover:bg-neutral-600 transition-all w-full rounded-xl text-center py-2"
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterCountries;

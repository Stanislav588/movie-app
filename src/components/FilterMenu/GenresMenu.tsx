import { FC, useContext, Dispatch, SetStateAction } from "react";
import { MovieContext } from "../../context/MovieContext";
import { motion } from "framer-motion";
import { Genres } from "../Movies/MovieInterface";

interface GenresProps {
  setIsOpenGenres: Dispatch<SetStateAction<boolean>>;
}
const GenresMenu: FC<GenresProps> = ({ setIsOpenGenres }) => {
  const { genresList, handleGenres } = useContext(MovieContext);
  return (
    <div
      onClick={() => setIsOpenGenres(false)}
      className={`fixed z-30 block md:hidden min-h-screen bg-black bg-opacity-55 transition-all inset-0 
        
        `}
    >
      <div className="absolute bottom-0 left-0 right-0">
        <motion.ul
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          className="gender-menu dark:bg-white  overflow-y-auto   max-h-[500px] flex-col  text-center"
        >
          {genresList.map((item: Genres) => {
            return (
              <li
                onClick={() => handleGenres(item.id, item.name)}
                className="genres-el dark:hover:bg-blue-500  cursor-pointer rounded-xl py-3 transition-all  "
                key={item.name}
              >
                <h1 className="text-xl text-white dark:text-black">
                  {item.name}
                </h1>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};

export default GenresMenu;

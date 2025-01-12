import { FC, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { MovieContext } from "../../context/MovieContext";
import { motion } from "framer-motion";

interface GenresProps {
  setIsOpenGenres: Dispatch<SetStateAction<boolean>>;
}
const GenresMenu: FC<GenresProps> = ({ setIsOpenGenres }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const { genresList, handleGenres } = useContext(MovieContext);
  return (
    <div
      onClick={() => setIsOpenGenres(false)}
      className={`fixed z-30 block md:hidden  min-h-screen bg-black bg-opacity-55 transition-all inset-0 
        
        `}
    >
      <div className="absolute bottom-0 left-0 right-0">
        <motion.ul
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          className="bg-neutral-800 py-4 overflow-y-auto px-6 max-h-[700px] flex-col   text-center"
        >
          {genresList.map((item) => {
            return (
              <li
                onClick={() => handleGenres(item.id, item.name)}
                className="cursor-pointer hover:bg-neutral-600 rounded-xl transition-all  py-4 "
                key={item.name}
              >
                <h1 className="text-xl text-white">{item.name}</h1>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};

export default GenresMenu;

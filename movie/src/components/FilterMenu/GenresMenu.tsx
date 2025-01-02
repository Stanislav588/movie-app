import {
  FC,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { MovieContext } from "../../context/MovieContext";

interface GenresProps {
  setIsOpenGenres: Dispatch<SetStateAction<boolean>>;
}
const GenresMenu: FC<GenresProps> = ({ setIsOpenGenres }) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisibleMenu(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const { genresList, handleGenres } = useContext(MovieContext);
  return (
    <div
      onClick={() => setIsOpenGenres(false)}
      className={`fixed z-30 block md:hidden  min-h-screen bg-black bg-opacity-55 ease-in-out transition-all inset-0 ${
        isVisibleMenu ? "translate-y-0" : "translate-y-full"
      } `}
    >
      <div className="absolute bottom-0 left-0 right-0">
        <ul className="bg-neutral-800 py-4 overflow-y-auto px-6 max-h-96 flex-col   text-center">
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
        </ul>
      </div>
    </div>
  );
};

export default GenresMenu;

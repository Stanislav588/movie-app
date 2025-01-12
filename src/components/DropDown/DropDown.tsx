import { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
type DropDownProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DropDown: FC<DropDownProps> = ({ setIsOpen }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleCloseDropDown() {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }
  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="p-7">
        <div className="flex justify-end">
          <IoClose
            onClick={handleCloseDropDown}
            className=" text-white  w-8 hover:rounded-full hover:border  h-8 cursor-pointer text-3xl"
          />
        </div>
        <ul className="text-white flex flex-col gap-6  text-3xl">
          <Link to="/">
            <li className="cursor-pointer hover:border-l-2 transition-all hover:pl-3">
              Home
            </li>
          </Link>
          <Link to="/favorites">
            <li className="cursor-pointer hover:border-l-2 transition-all hover:pl-3">
              Favorites
            </li>
          </Link>
          <Link to="/profile">
            <li className="cursor-pointer hover:border-l-2 transition-all hover:pl-3">
              Profile
            </li>
          </Link>
          <Link to="/catalog">
            <li className="cursor-pointer hover:border-l-2 transition-all hover:pl-3">
              Catalog
            </li>
          </Link>
          <Link to="/auth">
            <li className="cursor-pointer hover:border-l-2 transition-all hover:pl-3">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;

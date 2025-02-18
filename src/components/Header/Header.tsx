import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import DropDown from "../DropDown/DropDown";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import { IoMdSearch } from "react-icons/io";
import SearchMovie from "../Search/SearchMovie";
import { headerComponents } from "../../utils/constants";
import "./Header.css";
import { useDarkMode } from "../../hooks/useDarkMode";
const Header = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useDarkMode("dark");

  function handleDarkMode() {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  }
  useEffect(() => {
    if (darkMode === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [darkMode]);
  return (
    <div className="header text-gray-400 dark:bg-white z-30 py-5  px-2 md:px-8 gap-14 sm:gap-2 flex w-full  justify-between border-b border-b-slate-700 dark:border-b-gray-300">
      <div className="flex gap-14">
        <Link to="/">
          <h1 className="text-3xl dark:text-black text-white font-medium">
            Watch.com
          </h1>
        </Link>

        <ul className="hidden lg:flex md:hidden items-center text-xl gap-7 ">
          {headerComponents.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "header-el dark:border-b-blue-500 border-b-2 text-white dark:text-black "
                  : "dark:text-black font-medium"
              }
            >
              <li>
                <p className="text-md pb-2 ">{item.name.toUpperCase()}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
      {isOpenDropDown && <DropDown setIsOpen={setIsOpenDropDown} />}
      <div className="flex items-center lg:gap-7 md:gap-7 gap-3">
        {/* <div
          className={`md:dark-mode-btn ${
            darkMode === "dark" ? "active " : ""
          } cursor-pointer flex justify-around items-center gap-2`}
          onClick={handleDarkMode}
        >
          <i className=" hidden md:block fa-solid fa-moon text-white z-10"></i>
          <i className="hidden md:block fa-solid fa-sun text-white z-10"></i>
        </div> */}

        <RxHamburgerMenu
          onClick={() => setIsOpenDropDown(true)}
          className="w-10 lg:hidden cursor-pointer transition-all text-3xl font-medium hover:text-white"
        />
        <IoMdSearch
          onClick={() => setIsShowInput(true)}
          className="text-3xl cursor-pointer block "
        />
        {isShowInput && <SearchMovie setIsShowInput={setIsShowInput} />}
        <Link to="/auth">
          <div className="">
            <button className="btn-2 dark:bg-blue-500 dark:hover:text-blue-500 text-3xl px-4 py-1 text-white hidden sm:hidden md:block rounded-md">
              Sign In
            </button>
          </div>
        </Link>
        <ProfileSettings />
      </div>
    </div>
  );
};

export default Header;

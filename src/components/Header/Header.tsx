import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import DropDown from "../DropDown/DropDown";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import { IoMdSearch } from "react-icons/io";
import SearchMovie from "../Search/SearchMovie";
import { headerComponents } from "../../utils/constants";
import "./Header.css";
const Header = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  return (
    <div className="text-gray-400 z-30 py-5 mb-8 px-2 md:px-8 gap-14 sm:gap-2 flex  justify-between border-b border-b-slate-700">
      <div className="flex gap-14">
        <Link to="/">
          <h1 className="text-3xl text-white font-medium">Watch.com</h1>
        </Link>

        <ul className="hidden lg:flex md:hidden items-center text-xl gap-7 ">
          {headerComponents.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                isActive ? "header-el border-b-2 text-white" : ""
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
          <button className="btn-2 text-3xl px-8 py-1 text-white hidden sm:hidden  md:block rounded-md">
            Sign In
          </button>
        </Link>
        <ProfileSettings />
      </div>
    </div>
  );
};

export default Header;

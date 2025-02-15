import instagram from "../../images/instagram-white.png";
import gitHub from "../../images/git.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="px-16 border-t border-t-slate-700 mt-28">
      <h1 className="text-white text-3xl mb-7 mt-3 font-medium ">About us</h1>
      <div className="flex gap-8">
        <Link
          className="cursor-pointer"
          to={"https://www.instagram.com/stas.korniienko/"}
        >
          <img className="w-9" src={instagram} />
        </Link>
        <Link to={"https://github.com/Stanislav588"}>
          <img className="w-9" src={gitHub} />
        </Link>
        <img className="w-9" src={gitHub} />
      </div>
    </div>
  );
};
export default Footer;

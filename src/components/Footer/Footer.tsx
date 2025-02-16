import instagram from "../../images/instagram-white.png";
import gitHub from "../../images/git.png";
import linkedin from "../../images/linkedin-white.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-16 border-t dark:bg-blue-300 border-t-slate-700 py-16"
    >
      <h1 className="text-white text-center text-3xl mb-12 mt-3 font-medium ">
        About us
      </h1>
      <div className="flex justify-center gap-8">
        <Link
          className="cursor-pointer"
          to={"https://www.instagram.com/stas.korniienko/"}
        >
          <img className="w-9" src={instagram} />
        </Link>
        <Link to={"https://github.com/Stanislav588"}>
          <img className="w-9" src={gitHub} />
        </Link>
        <Link to={"https://www.linkedin.com/in/stanislav-kornienko-7a414933b/"}>
          <img className="w-9" src={linkedin} />
        </Link>
      </div>
    </motion.div>
  );
};
export default Footer;

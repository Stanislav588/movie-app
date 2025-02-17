import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { footerEl } from "../../utils/constants";
const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-16 border-t dark:bg-blue-300 border-t-slate-700 dark:border-t-gray-300 py-16"
    >
      <h1 className="text-white text-center text-3xl mb-12 mt-3 font-medium ">
        About us
      </h1>
      <div className="flex justify-center gap-8">
        {footerEl.map((el) => {
          return (
            <div key={el.id}>
              <Link to={el.link}>
                <img className="w-9" src={el.icon} />
              </Link>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
export default Footer;

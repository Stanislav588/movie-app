import { useEffect, useState } from "react";

import { getMovieImages } from "../../services/api";
import { AnimatePresence, motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
interface MovieImage {
  backdrop_path: string;
  id: number;
}
const Posters = () => {
  const [images, setImages] = useState<MovieImage[]>([]);
  const [currentPoster, setCurrentPoster] = useState(1);
  console.log(images);
  const imageBaseURL = "https://image.tmdb.org/t/p/original";

  function handleScrollToTheRight() {
    setCurrentPoster((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }
  function handleSelectedPoster(selected: number) {
    setCurrentPoster(selected);
  }
  function handleScrollToTheLeft() {
    setCurrentPoster((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
  useEffect(() => {
    async function handleGetMovieBanner() {
      try {
        const response = await getMovieImages(currentPoster);
        const changedData = response.slice(0, 8);
        setImages(changedData);
      } catch (error) {
        console.log(error);
      }
    }
    handleGetMovieBanner();
  }, []);
  console.log(images);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative dark:bg-slate-50 pt-14 pb-7 select-none"
    >
      <button
        onClick={handleScrollToTheLeft}
        className=" absolute top-1/2 left-0 rounded-full text-white transition z-10"
      >
        <IoIosArrowBack className="dark:text-black" size={60} />
      </button>
      <div className="relative w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {images.length > 0 && (
            <Link to={`/movie/${images[currentPoster]?.id}`}>
              <motion.img
                key={currentPoster}
                className="w-[1400px] h-[250px] md:h-[500px] object-cover block mx-auto rounded-xl"
                src={`${imageBaseURL}${images[currentPoster].backdrop_path}`}
                alt="banner"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {/* <p>{images[currentPoster].original_title}</p> */}
            </Link>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex gap-2">
          {Array.from({ length: images.length }).map((_, index) => {
            return (
              <GoDotFill
                size={20}
                onClick={() => handleSelectedPoster(index)}
                key={index}
                className={`transition-colors cursor-pointer ${
                  currentPoster === index ? "poster-dot" : "text-gray-400"
                }`}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={handleScrollToTheRight}
        className="absolute top-1/2  right-0 rounded-full text-white  transition z-10"
      >
        <IoIosArrowForward className="dark:text-black" size={60} />
      </button>
    </motion.div>
  );
};
export default Posters;

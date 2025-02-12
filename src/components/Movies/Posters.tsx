import { useEffect, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getMovieImages } from "../../services/api";
import { AnimatePresence, motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Posters = () => {
  const [images, setImages] = useState([]);
  const [currentPoster, setCurrentPoster] = useState(1);

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

  return (
    <div className="relative">
      <button
        onClick={handleScrollToTheLeft}
        className="absolute top-1/2 left-0 rounded-full text-white transition z-10"
      >
        <IoIosArrowBack size={60} />
      </button>
      <div className="relative w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {images.length > 0 && (
            <motion.img
              key={currentPoster}
              className="w-[90%] h-[250px] md:h-[500px] object-cover max-w-[1200px] block mx-auto rounded-xl"
              src={`${imageBaseURL}${images[currentPoster].backdrop_path}`}
              alt="banner"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
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
        <IoIosArrowForward size={60} />
      </button>
    </div>
  );
};
export default Posters;

import { FC, useEffect, useState } from "react";
import { Actors } from "./MovieInterface";
import { fetchCredits } from "../../services/api";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
const ActorPage: FC = () => {
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  const [allActorsData, setAllActorsData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function handleFetchActors() {
      try {
        const res = await fetchCredits(id);
        setAllActorsData(res.cast);
      } catch (error) {
        enqueueSnackbar(`Failed to fetch actors ${error}`, {
          variant: "error",
        });
      }
    }
    handleFetchActors();
  }, [id]);

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-8"
      >
        <Link to={`/${id}`}>
          <div className="flex gap-3  hover:scale-105 transition-all text-white items-center">
            <FaArrowLeftLong className="text-3xl" />
            <button className="text-2xl">Back to main page</button>
          </div>
        </Link>
        <div className="grid mt-10 text-center grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {allActorsData?.map((item: Actors) => {
            return (
              <div key={item.id}>
                {item.profile_path ? (
                  <div className=" text-white">
                    <img
                      className="w-[100%] mb-2"
                      src={`${imageBaseURL}${item.profile_path}`}
                    />
                    <p className="text-md font-medium">{item.name}</p>
                  </div>
                ) : (
                  <div className="gap-2 text-white">
                    <img
                      className="w-[100%] mb-2"
                      // src="https://picsum.photos/id/1015/212/318/?text=Image+Not+Available"
                      alt={item.name}
                    />
                    <p className=" text-md font-medium">{item.name}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default ActorPage;

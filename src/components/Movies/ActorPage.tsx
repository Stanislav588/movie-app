import { useEffect } from "react";
import { Actors, RootState } from "./MovieInterface";
import { fetchCredits, getSeriesCredits } from "../../services/api";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateActorsDetails } from "../../slices/movieSlice";
const ActorPage = () => {
  const allActors = useSelector(
    (state: RootState) => state.movie.allActorsDetails
  );

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { isMovie } = location?.state;
  useEffect(() => {
    async function handleFetchActors() {
      try {
        const res = isMovie
          ? await fetchCredits(id)
          : await getSeriesCredits(id);
        dispatch(updateActorsDetails(res.cast));
      } catch (error) {
        enqueueSnackbar(`Failed to fetch actors ${error}`, {
          variant: "error",
        });
      }
    }
    handleFetchActors();
  }, [id, isMovie]);

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-8"
      >
        <Link to={`${isMovie ? "/movie/" : "/series/"}${id}`}>
          <div className="flex gap-3  hover:scale-105 transition-all text-white items-center">
            <FaArrowLeftLong className="text-3xl" />
            <button className="text-2xl">Back to main page</button>
          </div>
        </Link>
        <div className="grid mt-10 text-center grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {allActors?.map((item: Actors) => {
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
                      src="https://picsum.photos/id/1015/212/318/?text=Image+Not+Available"
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

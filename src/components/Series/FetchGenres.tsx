import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Movies/MovieInterface";
import Header from "../Header/Header";

import { SeriesInfo } from "./Series";

import RenderSeriesItem from "./RenderSeriesItem";

const FetchGenres: FC = () => {
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  const series = useSelector((state: RootState) => state.movie.series);
  return (
    <>
      <Header />
      <div className="grid relative mt-12 px-2 grid-cols-2 lg:grid-cols-8  sm:grid-cols-3 md:grid-cols-4 gap-4">
        {series &&
          series.length > 0 &&
          series?.map((seriesItem: SeriesInfo) => {
            return (
              <RenderSeriesItem
                seriesItem={seriesItem}
                imageURL={imageBaseURL}
                key={seriesItem.id}
              />
            );
          })}
      </div>
    </>
  );
};

export default FetchGenres;

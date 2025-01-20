import { FC } from "react";
import PopularSeries from "./PopularSeries";
import RatedSeries from "./RatedSeries";
import SeriesGenres from "./SeriesGenres";
import Header from "../Header/Header";

const SeriesList: FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col px-5 gap-8">
        <PopularSeries />
        <RatedSeries />
        <SeriesGenres />
      </div>
    </>
  );
};

export default SeriesList;

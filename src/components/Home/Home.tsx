import { FC } from "react";
import Header from "../Header/Header";
import FilterMenu from "../FilterMenu/FilterMenu";
import Movies from "../Movies/Movies";

const Home: FC = () => {
  return (
    <>
      <Header />
      <FilterMenu />
      <Movies />
    </>
  );
};

export default Home;

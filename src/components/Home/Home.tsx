import Header from "../Header/Header";
import FilterMenu from "../FilterMenu/FilterMenu";
import Movies from "../Movies/Movies";
import Posters from "../Movies/Posters";

const Home = () => {
  return (
    <>
      <Header />
      <Posters />
      <FilterMenu />
      <Movies />
    </>
  );
};

export default Home;

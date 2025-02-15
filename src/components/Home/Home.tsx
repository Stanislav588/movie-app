import Header from "../Header/Header";
import FilterMenu from "../FilterMenu/FilterMenu";
import Movies from "../Movies/Movies";
import Posters from "../Movies/Posters";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Posters />
      <FilterMenu />
      <Movies />
      <Footer />
    </>
  );
};

export default Home;

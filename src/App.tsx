import "./App.css";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/AuthPage/Auth";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import ActorPage from "./components/Movies/ActorPage";
import Catalog from "./components/Catalog/Catalog";
import SeriesList from "./components/Series/SeriesList";
import ContentDetails from "./components/Movies/ContentDetails";
import FetchGenres from "./components/Series/FetchGenres";
import WishList from "./components/WishList/WishList";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<ContentDetails isMovie={true} />} />
        <Route
          path="/series/:id"
          element={<ContentDetails isMovie={false} />}
        />

        <Route
          path="/catalog/movie/:id"
          element={<ContentDetails isMovie={true} />}
        />

        <Route path="/:name" element={<FetchGenres />} />
        <Route path="/wishlist" element={<WishList />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/actors/:id" element={<ActorPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/series" element={<SeriesList />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;

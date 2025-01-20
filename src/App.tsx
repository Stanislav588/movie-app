import "./App.css";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import Auth from "./components/AuthPage/Auth";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import ActorPage from "./components/Movies/ActorPage";
import Catalog from "./components/Catalog/Catalog";
import SeriesList from "./components/Series/SeriesList";
import ContentDetails from "./components/Movies/ContentDetails";
import FetchGenres from "./components/Series/FetchGenres";

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
        {/* <Route path="/movie/:id" element={<Movie isMovie={true} />} />
        <Route path="/series/:id" element={<Movie isMovie={false} />} /> */}
        <Route path="/favorites" element={<Favorites />} />
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

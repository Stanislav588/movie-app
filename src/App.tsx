import "./App.css";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import CertainMovie from "./components/Movies/CertainMovie";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import Auth from "./components/AuthPage/Auth";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import ActorPage from "./components/Movies/ActorPage";
import Catalog from "./components/Catalog/Catalog";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CertainMovie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/actors/:id" element={<ActorPage />} />
        <Route path="/catalog" element={<Catalog />} />

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;

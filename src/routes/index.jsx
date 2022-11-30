import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Home from '../pages/Home';
import PeopleHome from '../pages/PeopleHome';
import PlanetHome from '../pages/PlanetHome';
import FilmHome from '../pages/FilmHome';
import SpecieHome from '../pages/SpecieHome';
import VehicleHome from '../pages/VehicleHome';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/people" element={ <PeopleHome /> } />
        <Route exact path="/planets" element={ <PlanetHome /> } />
        <Route exact path="/films" element={ <FilmHome /> } />
        <Route exact path="/species" element={ <SpecieHome /> } />
        <Route exact path="/vehicles" element={ <VehicleHome /> } />
        <Route exact path="/starships" element={ <VehicleHome /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import React, { useState, useEffect } from 'react';
import { getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function PlanetCard(data) {
  const [ residentsState, setResidentsState ] = useState('');
  const [ filmState, setFilmState ] = useState([]);

  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
  } = data;

  useEffect(() => {
    let currentResidents = [];
    let currentFilm = [];
    residents.forEach((resident) => {
      getBySpecificUrl(resident).then(({data}) => {
        currentResidents = [...currentResidents, data.name];
        setResidentsState(currentResidents);
      })
    })
    films.forEach((film) => {
      getBySpecificUrl(film).then(({data}) => {
        currentFilm = [...currentFilm, data.title];
        setFilmState(currentFilm);
      })
    })
  }, [])

  return (
    <div className='card'>
      <h3>{ name }</h3>
      <p>Período de rotação: {rotation_period}</p>
      <p>Período de orbita: {orbital_period}</p>
      <p>Diâmetro: {diameter}</p>
      <p>Clima: {climate}</p>
      <p>Gravidade: {gravity}</p>
      <p>Tipo de terreno: {terrain}</p>
      <p>Água na superfície: {surface_water === '1' ? 'Possui' : 'Não possui'}</p>
      <p>População: {population}</p>
      {
        residentsState.length !== 0 &&
        <p>Residentes: {residentsState.toString()}</p>
      }
      {
        filmState.length !== 0 &&
        <p>Filmes: {filmState.toString()}</p>
      }
    </div>
  )
}

export default PlanetCard;
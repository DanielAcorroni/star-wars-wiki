import React, { useState, useEffect } from 'react';
import { getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function PeopleCard(data) {
  const [ homeworldState, setHomeworldState ] = useState('');
  const [ specieState, setSpecieState ] = useState([]);
  const [ vehiclesState, setVehiclesState ] = useState([]);
  const [ starshipState, setStarshipState ] = useState([]);
  const [ filmState, setFilmState ] = useState([]);

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    species,
    vehicles,
    starships,
    films
  } = data;

  useEffect(() => {
    let currentSpecie = [];
    let currentVehicle = [];
    let currentStarship = [];
    let currentFilm = [];
    getBySpecificUrl(homeworld).then(({data}) => {
      setHomeworldState(data.name);
    });
    species.forEach((specie) => {
      getBySpecificUrl(specie).then(({data}) => {
        currentSpecie = [...currentSpecie, data.name];
        setSpecieState(currentSpecie);
      })
    })
    vehicles.forEach((vehicle) => {
      getBySpecificUrl(vehicle).then(({data}) => {
        currentVehicle = [...currentVehicle, data.name];
        setVehiclesState(currentVehicle);
      })
    })
    starships.forEach((starship) => {
      getBySpecificUrl(starship).then(({data}) => {
        currentStarship = [...currentStarship, data.name];
        setStarshipState(currentStarship);
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
      <p>Altura: {height}</p>
      <p>Peso: {mass}</p>
      <p>Cor do cabelo: {hair_color}</p>
      <p>Cor da pele: {skin_color}</p>
      <p>Cor do olho: {eye_color}</p>
      <p>Ano de nascimento: {birth_year}</p>
      <p>Gênero: {gender}</p>
      { homeworldState !== '' &&
        <p>Planeta de origem: {homeworldState}</p>
      }
      {
        specieState.length !== 0 &&
        <p>Espécie: {specieState.toString()}</p>
      }
      {
        vehiclesState.length !== 0 &&
        <p>Veículos: {vehiclesState.toString()}</p>
      }
      {
        starshipState.length !== 0 &&
        <p>Naves: {starshipState.toString()}</p>
      }
      {
        filmState.length !== 0 &&
        <p>Filmes: {filmState.toString()}</p>
      }
    </div>
  )
}

export default PeopleCard;
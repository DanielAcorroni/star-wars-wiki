import React, { useState, useEffect } from 'react';
import { getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function FilmCard(data) {
  const [ charactersState, setCurrentCharacter ] = useState([]);
  const [ planetsState, setPlanetsState ] = useState([]);
  const [ starshipState, setStarshipState ] = useState([]);
  const [ vehiclesState, setVehiclesState ] = useState([]);
  const [ specieState, setSpecieState ] = useState([]);

  const {
    title,
    opening_crawl,
    director,
    producer,
    release_date,
    characters,
    planets,
    starships,
    vehicles,
    species,
  } = data;

  useEffect(() => {
    let currentCharacter = [];
    let currentPlanet = [];
    let currentStarship = [];
    let currentVehicle = [];
    let currentSpecie = [];
    
    characters.forEach((character) => {
      getBySpecificUrl(character).then(({data}) => {
        currentCharacter = [...currentCharacter, data.name];
        setCurrentCharacter(currentCharacter);
      })
    })
    planets.forEach((planet) => {
      getBySpecificUrl(planet).then(({data}) => {
        currentPlanet = [...currentPlanet, data.name];
        setPlanetsState(currentPlanet);
      })
    })
    starships.forEach((starship) => {
      getBySpecificUrl(starship).then(({data}) => {
        currentStarship = [...currentStarship, data.name];
        setStarshipState(currentStarship);
      })
    })
    vehicles.forEach((vehicle) => {
      getBySpecificUrl(vehicle).then(({data}) => {
        currentVehicle = [...currentVehicle, data.name];
        setVehiclesState(currentVehicle);
      })
    })
    species.forEach((specie) => {
      getBySpecificUrl(specie).then(({data}) => {
        currentSpecie = [...currentSpecie, data.name];
        setSpecieState(currentSpecie);
      })
    })
  }, [])

  return (
    <div className='card'>
      <h3>{ title }</h3>
      <p>Enredo: {opening_crawl}</p>
      <p>Diretor: {director}</p>
      <p>Produtor: {producer}</p>
      <p>Data de lançamento: {release_date}</p>
      {
        charactersState.length !== 0 &&
        <p>Personagens: {charactersState.toString()}</p>
      }
      {
        planetsState.length !== 0 &&
        <p>Planetas: {planetsState.toString()}</p>
      }
      {
        starshipState.length !== 0 &&
        <p>Naves: {starshipState.toString()}</p>
      }
      {
        vehiclesState.length !== 0 &&
        <p>Veículos: {vehiclesState.toString()}</p>
      }
      {
        specieState.length !== 0 &&
        <p>Espécies: {specieState.toString()}</p>
      }
    </div>
  )
}

export default FilmCard;
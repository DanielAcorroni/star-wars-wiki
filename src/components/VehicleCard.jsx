import React, { useState, useEffect } from 'react';
import { getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function VehicleCard(data) {
  const [ pilotState, setPilotState ] = useState([]);
  const [ filmState, setFilmState ] = useState([]);

  const {
    name,
    model,
    manufacturer,
    cost_in_credits,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    consumables,
    vehicle_class,
    starship_class,
    MGLT,
    hyperdrive_rating,
    pilots,
    films
  } = data;

  useEffect(() => {
    let currentPilot = [];
    let currentFilm = [];
    pilots.forEach((pilot) => {
      getBySpecificUrl(pilot).then(({data}) => {
        currentPilot = [...currentPilot, data.name];
        setPilotState(currentPilot);
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
      <p>Modelo: {model}</p>
      <p>Fabricante: {manufacturer}</p>
      <p>Preço em cŕeditos: {cost_in_credits}</p>
      <p>Largura: {length}</p>
      <p>Velocidade: {max_atmosphering_speed}</p>
      <p>Equipe: {crew}</p>
      <p>Passageiros: {passengers}</p>
      <p>Capacidade de carga: {cargo_capacity}</p>
      <p>Consumíveis: {consumables}</p>
      <p>Classe: {vehicle_class ? vehicle_class : starship_class}</p>
      {
        starship_class &&
        <>
          <p>MGLT: {MGLT}</p>
          <p>Nota de hyperdrive: {hyperdrive_rating}</p>
        </>
      }
      {
        pilotState.length !== 0 &&
        <p>Pilotos: {pilotState.toString()}</p>
      }
      {
        filmState.length !== 0 &&
        <p>Filmes: {filmState.toString()}</p>
      }
    </div>
  )
}

export default VehicleCard;
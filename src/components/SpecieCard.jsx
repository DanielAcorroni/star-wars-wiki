import React, { useState, useEffect } from 'react';
import { getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function SpecieCard(data) {
  const [ homeworldState, setHomeworldState ] = useState('');
  const [ peopleState, setPeopleState ] = useState([]);
  const [ filmState, setFilmState ] = useState([]);

  const {
    name,
    classification,
    designation,
    average_height,
    skin_colors,
    hair_colors,
    eye_colors,
    average_lifespan,
    homeworld,
    language,
    people,
    films
  } = data;

  useEffect(() => {
    let currentPeople = [];
    let currentFilm = [];
    getBySpecificUrl(homeworld).then(({data}) => {
      setHomeworldState(data.name);
    });
    people.forEach((p) => {
      getBySpecificUrl(p).then(({data}) => {
        currentPeople = [...currentPeople, data.name];
        setPeopleState(currentPeople);
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
      <p>Classificação: {classification}</p>
      <p>Designação: {designation}</p>
      <p>Altura média: {average_height}</p>
      <p>Cores de pele: {skin_colors}</p>
      <p>Cores de cabelo: {hair_colors}</p>
      <p>Cores de olho: {eye_colors}</p>
      <p>Tempo médio de vida: {average_lifespan} anos</p>
      <p>Linguagem: {language}</p>
      { homeworldState !== '' &&
        <p>Planeta de origem: {homeworldState}</p>
      }
      {
        peopleState.length !== 0 &&
        <p>Pessoas: {peopleState.toString()}</p>
      }
      {
        filmState.length !== 0 &&
        <p>Filmes: {filmState.toString()}</p>
      }
    </div>
  )
}

export default SpecieCard;
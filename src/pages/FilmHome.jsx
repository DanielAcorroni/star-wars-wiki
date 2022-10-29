import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FilmCard from '../components/FilmCard'
import { getAll } from '../services/axiosFetchs';
import '../assets/index.css';

function FilmHome() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getAll('films').then(({data}) => {
      setFilms(data.results);
    })
  }, []);

  return (
    <div>
    <NavBar />
      <div className='ppl-cards-container'>
        {
          films &&
          films.map((e) => <FilmCard key={e.title} className="api-card-name" { ...e }/>)
        }
      </div>
    </div>
  )
}

export default FilmHome;
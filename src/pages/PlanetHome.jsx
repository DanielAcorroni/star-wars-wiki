import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import PlanetCard from '../components/PlanetCard'
import { getAll, getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function PlanetHome() {
  const [planets, setPlanets] = useState([]);
  const [nextAndPrev, setNextAndPrev] = useState({});

  useEffect(() => {
    getAll('planets').then(({data}) => {
      setPlanets(data.results);
      setNextAndPrev({next: data.next || undefined, previous: data.previous || undefined})
    })
  }, []);

  return (
    <div>
    <NavBar />
      <div className='ppl-cards-container'>
        {
          planets &&
          planets.map((e) => <PlanetCard key={e.name} className="api-card-name" { ...e }/>)
        }
        <div className='next-prev-container'>
          {
            nextAndPrev.previous &&
            <button onClick={ () => {
              getBySpecificUrl(nextAndPrev.previous).then(({data}) => {
                setPlanets(data.results);
                setNextAndPrev({next: data.next || undefined, previous: data.previous || undefined})
                })
            } }>
              ⬅️ Previous Page
            </button>
          }
          {
            nextAndPrev.next &&
            <button onClick={ () => {
              getBySpecificUrl(nextAndPrev.next).then(({data}) => {
                setPlanets(data.results);
                setNextAndPrev({next: data.next || undefined, previous: data.previous || undefined})
                console.log(data.previous);
              })
            } }>
              Next Page ➡️
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default PlanetHome;
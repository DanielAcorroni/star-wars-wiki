import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SpecieCard from '../components/SpecieCard'
import { getAll, getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function SpecieHome() {
  const [specie, setSpecie] = useState([]);
  const [nextAndPrev, setNextAndPrev] = useState({});

  useEffect(() => {
    getAll('species').then(({data}) => {
      setSpecie(data.results);
      setNextAndPrev({next: data.next || undefined, previous: data.previous || undefined})
    })
  }, []);

  return (
    <div>
    <NavBar />
      <div className='ppl-cards-container'>
        {
          specie &&
          specie.map((e) => <SpecieCard key={e.name} className="api-card-name" { ...e }/>)
        }
        <div className='next-prev-container'>
          {
            nextAndPrev.previous &&
            <button onClick={ () => {
              getBySpecificUrl(nextAndPrev.previous).then(({data}) => {
                setSpecie(data.results);
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
                setSpecie(data.results);
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

export default SpecieHome;
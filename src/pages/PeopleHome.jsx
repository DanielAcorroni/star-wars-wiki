import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import PeopleCard from '../components/PeopleCard'
import { getAll, getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function PeopleHome() {
  const [people, setPeople] = useState([]);
  const [nextAndPrev, setNextAndPrev] = useState({});

  useEffect(() => {
    getAll('people').then(({data}) => {
      setPeople(data.results);
      setNextAndPrev({next: data.next || undefined, previous: data.previous || undefined})
    })
  }, []);

  return (
    <div>
    <NavBar />
      <div className='ppl-cards-container'>
        {
          people &&
          people.map((e) => <PeopleCard key={e.name} className="api-card-name" { ...e }/>)
        }
        <div className='next-prev-container'>
          {
            nextAndPrev.previous &&
            <button onClick={ () => {
              getBySpecificUrl(nextAndPrev.previous).then(({data}) => {
                setPeople(data.results);
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
                setPeople(data.results);
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

export default PeopleHome;
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import VehicleCard from '../components/VehicleCard'
import { getAll, getBySpecificUrl } from '../services/axiosFetchs';
import '../assets/index.css';

function VehicleHome() {
  const [vehicle, setVehicle] = useState([]);
  const [nextAndPrev, setNextAndPrev] = useState({});

  useEffect(() => {
    const { pathname } = window.location;
    const url = pathname.match('vehicles') ? 'vehicles' : 'starships';
    getAll(url).then(({data}) => {
      setVehicle(data.results);
      setNextAndPrev({next: data.next || undefined, previous: data.previous || undefined})
    })
  }, []);

  return (
    <div>
    <NavBar />
      <div className='ppl-cards-container'>
        {
          vehicle &&
          vehicle.map((e) => <VehicleCard key={e.name} className="api-card-name" { ...e }/>)
        }
        <div className='next-prev-container'>
          {
            nextAndPrev.previous &&
            <button onClick={ () => {
              getBySpecificUrl(nextAndPrev.previous).then(({data}) => {
                setVehicle(data.results);
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
                setVehicle(data.results);
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

export default VehicleHome;
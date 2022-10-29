import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { disponibleApis } from '../services/axiosFetchs';
import '../assets/index.css';

function Home() {
  const [apis, setApis] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    disponibleApis().then(({data}) => {
      setApis(data);
    })
  }, []);

  return (
    <>
      <NavBar />
      <div className='api-cards-container'>
        {
          Object.keys(apis)
            .map((e) => (
              <button
                key={e}
                className="api-card-name"
                onClick={ () => navigate(`/${e}`) }>
                  {e.toUpperCase()}
              </button>
            ))
        }
      </div>
    </>
  )
}

export default Home;
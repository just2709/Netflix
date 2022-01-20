import React from "react";
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";

function CastPeople({id, poster_path}) {
  const [castPeople, setCastPeople] = useState(null);

  const getCastPeople = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=056adb2993b61aff8516b32900fa97e7&language=en-US`
      )
    ).json();
    setCastPeople(json.cast.slice(0,10));
  };

  useEffect(() => {
    getCastPeople();
  }, [id]);
  
  return (
    <>
      {castPeople && 
        (
          <div className='grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5'>
            {castPeople.map((item, index) => (
              <div key={index} className=''>
                <img
                  src={
                    item.profile_path === null
                      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                      : `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                  }
                  alt={item.name}
                />
                <h1>{item.name}</h1>
              </div>
            ))}
          </div>
        )
      }
    </>
  );
}

CastPeople.propTypes = {
    id: PropTypes.string.isRequired
}

export default CastPeople;

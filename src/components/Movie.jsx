import { React, memo} from "react";
import PropTypes from 'prop-types'

import { Zoom } from "react-reveal";
import config from 'react-reveal/globals';



import {Link} from 'react-router-dom'
config({ ssrFadeout: true });


function Movie({ id, poster_path, title, imdb, media_type }) {
  return (
      <div key={id} className='px-[6px] lg:hover:text-[#FF0000] lg:transition duration-75 lg:hover:scale-105 font-bold my-3 '>
    <Zoom opposite>

        <Link to={`/${media_type}/${id}`}>
          <div className='relative'>
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                className='rouded rounded-3xl'
            />
            <div className='absolute top-0 border-2 border-black px-2 rounded flex items-center bg-yellow-500 text-black'>
              IMDb: <p>{imdb}</p>
            </div>
            
          </div>
            
            <h2 className='lg:text-lg'>{title}</h2>
        </Link>
        </Zoom>

    </div>
    
  );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    // poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imdb: PropTypes.number.isRequired,
}

export default memo(Movie);

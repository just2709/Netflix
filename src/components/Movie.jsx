import { React, memo } from "react";
import PropTypes from "prop-types";

import { Zoom } from "react-reveal";
import config from "react-reveal/globals";

import { Link } from "react-router-dom";
config({ ssrFadeout: true });

function Movie({ id, poster_path, title, imdb, media_type }) {
  return (
    <Zoom opposite className='h-full'>
      <div key={id} className='px-[6px]  font-bold my-3'>
        <Link to={`/${media_type}/${id}`} className='h-full'>
          <div className='relative h-full lg:hover:text-[#FF0000] lg:transition duration-75 lg:hover:scale-105'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              className='rouded rounded-3xl h-full w-full '
            />
            <div className='absolute top-0 border-2 border-black px-2 rounded flex items-center bg-yellow-500 text-black'>
              IMDb: <p>{imdb}</p>
            </div>
            <h2 className='lg:text-lg absolute z-50 bottom-0 bg-black bg-opacity-60 w-full p-2'>
              {title}
            </h2>
          </div>
        </Link>
      </div>
    </Zoom>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  // poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imdb: PropTypes.number.isRequired,
};

export default memo(Movie);

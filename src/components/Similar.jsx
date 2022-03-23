import React from "react";
import { useState, useEffect } from "react";

import Movie from "./Movie";

//icon

function Similar({ id, media_type }) {
  const [movies, setMovies] = useState([]);

  // const { id, media_type } = useParams();

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=056adb2993b61aff8516b32900fa97e7&language=en-US`
      )
    ).json();
    setMovies(json.results.filter(checkPathNull));
  };
  function checkPathNull(item) {
    return item.poster_path !== null;
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='relative text-white mb-8 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2'>
      {movies.map((movie) => (
        <Movie
          className='h-full'
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title === undefined ? movie.name : movie.title}
          imdb={movie.vote_average}
          media_type={media_type}
        />
      ))}
    </div>
  );
}

export default Similar;

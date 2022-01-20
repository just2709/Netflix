import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ListMovie.css";

import Movie from "./Movie";

import { Link } from "react-router-dom"

//icon

function ListMovie({apiUrl, name, media_type, type, isLoading}) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    isLoading = true;
    const json = await (
      await fetch(
        apiUrl
      )
    ).json();
    setMovies(json.results);
    isLoading = false;
  };

  useEffect(() => {
    getMovies();
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    swipeToSlide: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className='relative text-white pb-8'>
          <h1 className='font-bold mb-4 lg:text-2xl'>{name}</h1>

        <Link to={`/${type}`}>
          <button className='absolute right-3 top-0 font-semibold border-2 px-10 rounded-2xl lg:transition-all lg:hover:bg-white lg:hover:text-red-600 lg:hover:scale-105'>
            More
          </button>
        </Link>
        
        <Slider className='lg:px-2' {...settings}>
        {movies.map((movie) => (
          <Movie
            className=''
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title === undefined ? movie.name : movie.title}
            imdb={movie.vote_average}
            media_type={media_type}
          />
        ))}
      </Slider>
      
    </div>
  );
}

export default ListMovie;

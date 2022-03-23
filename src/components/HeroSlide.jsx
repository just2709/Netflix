import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import Fade from "react-reveal";

function HeroSlide() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=056adb2993b61aff8516b32900fa97e7"
      )
    ).json();
    setMovies(json.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className='relative text-white hidden lg:block'>
      <Slider className='' {...settings}>
        {movies.map((movie) => (
          <div className='relative' key={movie.id}>
            <div
              className='bg-cover bg-no-repeat'
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1) 99%), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
              }}>
              <img
                className='opacity-0'
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
            </div>
            <div className='absolute top-1/3 w-2/3 px-[10%]'>
              <Fade top>
                <h1 className='text-4xl font-bold'>
                  {movie.title === undefined ? movie.name : movie.title}
                </h1>
                <h1 className='text-xl my-10'>
                  {movie.overview.length > 250
                    ? `${movie.overview.slice(0, 250)} ...`
                    : movie.overview}
                </h1>
              </Fade>

              <Fade bottom>
                <Link to={`/${movie.media_type}/${movie.id}`}>
                  <button className='bg-red-600 px-10 py-2 rounded-full mr-5 text-2xl font-semibold lg:hover:scale-105'>
                    Watch now
                  </button>
                  <button className='bg-white text-red-600 px-10 py-2 rounded-full text-2xl font-semibold lg:hover:scale-105'>
                    Watch trailer
                  </button>
                </Link>
              </Fade>
            </div>
            <Fade right>
              <img
                className='absolute w-1/5 border border-red-200 rounded-tl-3xl rounded-br-3xl right-[15%] lg:top-[25%]'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </Fade>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlide;

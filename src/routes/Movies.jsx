import React from "react";
import { useState, useEffect, useRef } from "react";

import Movie from "../components/Movie";
import { FaSearch } from "react-icons/fa";


function Movies() {
  const [movies, setMovies] = useState(null);
  const [moviesTrend, setMoviesTrend] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [keySearch, setKeySearch] = useState('');

  const textSearch = useRef()

  const getTrendingMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=056adb2993b61aff8516b32900fa97e7&page=${currentPage}`
      )
    ).json();
    setTotalPage(json.total_pages);
    if (moviesTrend === null) {
      setMoviesTrend(json.results.filter(checkPathNull));
    } else {
      setMoviesTrend([...moviesTrend, ...json.results.filter(checkPathNull)]);
    }
  };

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=056adb2993b61aff8516b32900fa97e7&query=${keySearch}&page=${currentPage}`
      )
    ).json();
    setTotalPage(json.total_pages);
    if (movies === null) {
      setMovies(json.results.filter(checkPathNull));
    } else {
      setMovies([...movies, ...json.results.filter(checkPathNull)]);
    }
  };
  function checkPathNull(item) {
    return item.poster_path !== null;
  }
  useEffect(() => {
    if(isSearched) {
      getMovies();
    } else {
      getTrendingMovies()
    }
  }, [keySearch ,isSearched, currentPage]);

  // console.log(totalPage)
  function More() {
    setCurrentPage(currentPage + 1);
  }

  function search() {
    setMovies(null)
    setKeySearch(textSearch.current.value);
    setIsSearched(true);
    setCurrentPage(1)
  }
  return (
    <div className='max-w-[1200px] mx-auto px-2 lg:px-10 text-white pt-20'>
      <div
        id='searchBar'
        className={`pb-3 sm:block lg:top-auto lg:w-2/5 lg:left-1/4 lg:pb-0 lg:bg-transparent`}>
        <div className='relative flex items-center mx-5 text-black sm:w-[300px]'>
          <input
            ref={textSearch}
            className='text-xl w-full p-2 rounded-3xl outline-none'
            placeholder='Search here...'
          />
          <FaSearch onClick={search} className='absolute right-5 cursor-pointer' />
        </div>
      </div>
      {isSearched ? (
        movies && (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
            <h1 className='text-2xl font-bold mt-5 text-white col-span-2 sm:col-span-3 lg:col-span-5'>Search for <span className='text-red-500'>{keySearch}</span></h1>
            {movies.map((movie, index) => (
              <Movie
                className=''
                key={index}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title === undefined ? movie.name : movie.title}
                imdb={movie.vote_average}
                media_type='movie'
              />
            ))}
          </div>
        )
      ) : (
        moviesTrend && (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 '>
            {moviesTrend.map((movie, index) => (
              <Movie
                className=''
                key={index}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title === undefined ? movie.name : movie.title}
                imdb={movie.vote_average}
                media_type='movie'
              />
            ))}
          </div>
        )
      )}
      
      <div className='w-full mx-auto pb-10 flex'>
        <button
          className={`${
            currentPage === totalPage ? "hidden" : ""
          } bg-red-600 border-none px-10 mx-auto text-xl rounded-full py-2 font-semibold lg:hover:scale-105`}
          onClick={More}>
          More
        </button>
      </div>
    </div>
  );
}

export default Movies;

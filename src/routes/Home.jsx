import React from "react";
// import { useState, useEffect } from "react";

// import Movie from "../components/Movie";
import ListMovie from "../components/ListMovie";
import HeroSlide from "../components/HeroSlide";

function Home() {
  const listMovie = [
    {
      name: "Trending Movies",
      apiUrl: "https://api.themoviedb.org/3/trending/movie/day?api_key=056adb2993b61aff8516b32900fa97e7"
    },
    {
      name: "Top Rated Movies",
      apiUrl: "https://api.themoviedb.org/3/movie/top_rated?api_key=056adb2993b61aff8516b32900fa97e7"
    },
    {
      name: "Popular Movies",
      apiUrl: "https://api.themoviedb.org/3/movie/popular?api_key=056adb2993b61aff8516b32900fa97e7"
    },
    {
      name: "Trending TV",
      apiUrl: "https://api.themoviedb.org/3/trending/tv/day?api_key=056adb2993b61aff8516b32900fa97e7"
    },
    {
      name: "Top Rated TV",
      apiUrl: "https://api.themoviedb.org/3/tv/top_rated?api_key=056adb2993b61aff8516b32900fa97e7"
    },
    {
      name: "Popular TV",
      apiUrl: "https://api.themoviedb.org/3/tv/popular?api_key=056adb2993b61aff8516b32900fa97e7"
    },
  ]

  return (
    <>
    <HeroSlide/>
    <div className="bg-black max-w-[1200px] mx-auto px-2 lg:px-10 text-white pt-[20%] lg:pt-0">
      {listMovie.map((item, index) => (
        <ListMovie type={index < 3 ? 'movies' : 'series'} media_type={index < 3 ? 'movie' : 'tv'} key={index} name={item.name} apiUrl={item.apiUrl}/>

      ))}

    </div>
    </>
    
  );
}

export default Home;

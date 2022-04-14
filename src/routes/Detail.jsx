import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CastPeople from "../components/CastPeople";
import StarRating from "../components/StarRating";
import Similar from "../components/Similar";
import Video from "../components/Trailer";

function Detail() {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);

  const { id, media_type } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=056adb2993b61aff8516b32900fa97e7&language=en-US`
      )
    ).json();
    setMovie(json);
  };

  const getVideo = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=056adb2993b61aff8516b32900fa97e7&language=en-US`
      )
    ).json();
    setVideo(json.results.slice(0, 5));
  };

  useEffect(() => {
    getMovie();
    getVideo();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {movie && (
        <div
          key={id}
          className={`w-full text-white bg-contain bg-no-repeat `}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1) 30%), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}>
          <div className='max-w-[1200px] mx-auto px-2 w-full pt-[150px] sm:grid grid-cols-3 gap-5'>
            <img
              alt={`${movie.poster_path}`}
              className='hidden sm:block border border-red-200 rounded-tl-3xl rounded-br-3xl'
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <div className='col-span-2'>
              <h2 className='text-3xl font-bold mb-5'>{movie.title}</h2>
              {movie.genres.map((item, index) => (
                <button
                  key={index}
                  className='px-2 rounded-full border-2 mr-2 text-xl'>
                  {item.name}
                </button>
              ))}
              <h1 className='mt-5'>
                <StarRating
                  className='block w-full'
                  rate={movie.vote_average}
                />
              </h1>
              <p className='mt-5 text-xl'>{movie.overview}</p>
              {media_type === "movie" ? (
                <Link to={`/watch/${media_type}/${id}`}>
                  <button className='bg-red-600 px-10 py-2 rounded-full text-2xl font-semibold lg:hover:scale-105 mt-5'>
                    Watch now
                  </button>
                </Link>
              ) : (
                <Link to={`/watch/${media_type}/${id}/season1/esp1`}>
                  <button className='bg-red-600 px-10 py-2 rounded-full text-2xl font-semibold lg:hover:scale-105 mt-5'>
                    Watch now
                  </button>
                </Link>
              )}

              <h1 className='text-2xl font-bold mt-5'>Cast</h1>
              <CastPeople id={id} poster_path={movie.poster_path} />
            </div>
            {video &&
              video.map((item, index) => (
                <Video
                  className='col-span-3'
                  key={index}
                  keyVideo={item.key}
                  name={item.name}
                />
              ))}

            <div className='col-span-3'>
              <h1 className='text-2xl font-bold mt-5'>Similar</h1>
              <Similar id={id} media_type={media_type} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;

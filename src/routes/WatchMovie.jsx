import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "../components/Film";
import Similar from "../components/Similar";

function WatchMovie() {
  const [movie, setMovie] = useState(null);
  //   const [video, setVideo] = useState(null);

  const { id, media_type } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=056adb2993b61aff8516b32900fa97e7&language=en-US`
      )
    ).json();
    setMovie(json);
  };

  useEffect(() => {
    getMovie();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {movie && (
        <div
          key={id}
          className={`w-full text-white bg-contain bg-no-repeat pt-16`}>
          <div className='max-w-[1200px] mx-auto px-2 w-full pt-[60px] sm:grid grid-cols-3 gap-5'>
            <Video
              className='col-span-3'
              keyVideo={movie.id}
              type={media_type}
            />

            <div className='col-span-3'>
              <h2 className='text-3xl font-bold mb-5'>
                {movie.title === undefined ? movie.name : movie.title}
              </h2>
              <p className='mt-5 text-xl'>{movie.overview}</p>
            </div>

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

export default WatchMovie;

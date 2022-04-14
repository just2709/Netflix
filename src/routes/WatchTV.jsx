import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Video from "../components/Film";
import Similar from "../components/Similar";

function WatchTV() {
  const [movie, setMovie] = useState(null);
  //   const [video, setVideo] = useState(null);
  // const [currentSeason, setCurrentSeason] = useState(1);
  const [esps, setEsps] = useState([]);

  const { id, media_type, season, esp } = useParams();
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
  }, [id]);

  const getEsps = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/season/${season}?api_key=056adb2993b61aff8516b32900fa97e7`
      )
    ).json();
    setEsps(json.episodes);
  };

  useEffect(() => {
    getEsps();
    window.scrollTo(0, 0);
  }, [season, esp]);

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
              season={season}
              esp={esp}
            />

            <div className='col-span-3'>
              <h2 className='text-3xl font-bold mb-5'>
                {movie.title === undefined ? movie.name : movie.title}
              </h2>
              <p className='mt-5 text-xl'>{movie.overview}</p>
            </div>

            <div className='col-span-3'>
              {movie.seasons.map((item, index) => (
                <div>
                  <h1 key={index} className='text-xl mb-2 mt-5'>
                    {item.name}
                  </h1>
                  {esps.map((item1, index) => (
                    <Link
                      to={`/watch/${media_type}/${id}/season${item.season_number}/esp${item1.episode_number}`}>
                      {item.season_number == season &&
                      item1.episode_number == esp ? (
                        <button
                          className={`px-5 py-2 border border-white mr-3 bg-red-700`}
                          key={index}>
                          {item1.episode_number}
                        </button>
                      ) : (
                        <button
                          className={`px-5 py-2 border border-white mr-3`}
                          key={index}>
                          {item1.episode_number}
                        </button>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
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

export default WatchTV;

import React, { useEffect, useRef } from "react";

function Video({ type, keyVideo, season, esp }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  if(type === 'movie')
  {
    return (
      <div className='col-span-3'>
        {
          <iframe
            //   https://www.2embed.ru/embed/tmdb/movie?id=10957
            src={`https://www.2embed.ru/embed/tmdb/movie?id=${keyVideo}`}
            ref={iframeRef}
            width='100%'
            title='video'
            className=''
            allowfullscreen='true'
            webkitallowfullscreen='true'
            mozallowfullscreen='true'></iframe>
        }
      </div>
    )
  }
  else if(type === 'tv') {
    return (
      <div className='col-span-3'>
        {
          <iframe
            //   https://www.2embed.ru/embed/tmdb/movie?id=10957
            src={`https://www.2embed.ru/embed/tmdb/tv?id=${keyVideo}&s=${season}&e=${esp}`}
            ref={iframeRef}
            width='100%'
            title='video'
            className=''
            allowfullscreen='true'
            webkitallowfullscreen='true'
            mozallowfullscreen='true'></iframe>
        }
      </div>
    )
  }
}

export default Video;

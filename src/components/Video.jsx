import React, { useEffect, useRef } from 'react';

function Video({name, keyVideo}) {

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="col-span-3">
            <div className="video__title">
                <h1 className="font-bold text-2xl">{name}</h1>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${keyVideo}`}
                ref={iframeRef}
                width="100%"
                title="video"
                className="border"
            ></iframe>
        </div>
    )
}

export default Video
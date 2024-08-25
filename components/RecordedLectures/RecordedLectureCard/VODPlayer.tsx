// components/NativeVODPlayer.js

import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

const VODPlayer = ({ url }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });

            return () => {
                hls.destroy();
            };
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // Some browsers (e.g., Safari) support HLS natively
            videoRef.current.src = url;
        }
    }, [url]);

    return (
        <video ref={videoRef} controls width="600" height="300" />
    );
};

export default VODPlayer;

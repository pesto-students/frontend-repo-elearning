// components/VODPlayer.js

import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VODPlayerV2 = ({ url }) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    useEffect(() => {
        // Initialize the player when the component mounts
        playerRef.current = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            preload: 'metadata',
            sources: [{
                src: url,
                type: 'application/x-mpegURL'
            }],
            aspectRatio: "16:9",
            enableSmoothSeeking: true,
            fluid: true,
            // liveui: true,
            // restoreEl: true,
        });

        return () => {
            // Clean up the player when the component unmounts
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [url]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-default-skin" width="600" height="300" />
        </div>
    );
};

export default VODPlayerV2;

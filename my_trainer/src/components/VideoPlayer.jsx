import React, { useRef, useEffect } from 'react';

function VideoPlayer({ video_url, props, onFrame }) {
  const videoRef = useRef(null);

  const handleNewFrame = () => {
    onFrame(videoRef.current)
  };

  useEffect(() => {
    const intervalId = setInterval(handleNewFrame, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div>
      {/* Video Player */}
      <div className={props.className}>
        <video
          className='input_video'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          ref={videoRef}
          controls={true}
          width={props.width}
          height={props.height}
          autoPlay={true}
          src={video_url}
        >
          {/* <source src={video_url} type="video/mp4" /> */}
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;

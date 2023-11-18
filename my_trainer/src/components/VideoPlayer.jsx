import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils/camera_utils.js';

function VideoPlayer({ webcam, video_url, props, onFrame, detection_frame_rate }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleNewFrame = () => {
      onFrame(videoRef.current)
    };
    if (webcam) {
      const camera = new Camera(videoRef.current, {
          onFrame: async () => {
              const wait = () => new Promise(resolve => setTimeout(resolve, 1000/detection_frame_rate));
              await wait();
              handleNewFrame();
          },
          width: 1280,
          height: 720,
      });
  
      camera.start();
      
      // Cleanup function (optional) to be executed on component unmount
      return () => { camera.stop(); };
    } else {
      const intervalId = setInterval(handleNewFrame, 1000/detection_frame_rate);
      return () => { clearInterval(intervalId); }
    }
  }, [webcam, onFrame]);

  return (
    <div>
      {/* Video Player */}
      <div className={props.className}>
        {webcam ? (
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transform: 'scaleX(-1)',
            }}
            ref={videoRef}
            controls={false}
            autoPlay={true}
          ></video>
        ) : (
          <video
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
          >
            <source src={video_url} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;

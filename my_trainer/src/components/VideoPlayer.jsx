import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils/camera_utils.js';

function VideoPlayer({ webcam, video_url, props, onFrame }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleNewFrame = () => {
      onFrame(videoRef.current)
    };
    if (webcam) {  
      const startWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error('Error accessing webcam:', error);
        }
      };
  
      startWebcam();
      videoRef.current.addEventListener('timeupdate', handleNewFrame);
  
      return () => {
        // Cleanup: Stop the webcam stream when the component unmounts
        if (webcam && videoRef.current) {
          const stream = videoRef.current.srcObject;
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
          }
        }
      };
    } else {
      const intervalId = setInterval(handleNewFrame, 1000);
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

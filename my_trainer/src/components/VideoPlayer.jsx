import React, { useRef, useEffect } from 'react';

function VideoPlayer({ webcam, video_url, props, onFrame }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleNewFrame = () => {
      onFrame(videoRef.current)
      // const video = videoRef.current;
      // const canvas = canvasRef.current;

      // if (video && canvas) {
      //   const context = canvas.getContext('2d', {willReadFrequently:true});
      //   context.drawImage(video, 0, 0, canvas.width, canvas.height);

      //   // Get the image data from the canvas and pass it to onFrame
      //   const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      //   onFrame(imageData);
      // }
    };

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    if (webcam) {
      startWebcam();
      videoRef.current.addEventListener('timeupdate', handleNewFrame);
    }

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

      {/* Canvas for capturing frames */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default VideoPlayer;

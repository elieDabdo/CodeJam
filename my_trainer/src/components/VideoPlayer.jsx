import React, { useRef, useEffect } from 'react';

function VideoPlayer({ webcam, video_url, props, onFrame }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const convertToRGB = (frame) => {
    // Remove alpha channel (fourth component) and create RGB array
    const redArray = new Array(0);
    const greenArray = new Array(0);
    const blueArray = new Array(0);

    for (let i = 0, j = 0; i < frame.data.length; i += 4, j += 3) {
        redArray.push(frame.data[i] / 255);       // Red
        greenArray.push(frame.data[i + 1] / 255); // Green
        blueArray.push(frame.data[i + 2] / 255); // Blue
    }

    return {data: new Float32Array(redArray.concat(greenArray).concat(blueArray)), width: frame.width, height:frame.height};
  }

  function resizeImageData(imageData) {
    // Create a new canvas with the desired dimensions
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
  
    // Get the 2D context of the canvas
    const context = canvas.getContext('2d');
  
    // Draw the existing image data onto the new canvas
    context.putImageData(imageData, 0, 0);
  
    // Get the new image data from the canvas
    const resizedImageData = context.getImageData(0, 0, 640, 640);
  
    return resizedImageData;
  }

  useEffect(() => {
    const handleNewFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        const context = canvas.getContext('2d', {willReadFrequently:true});
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the image data from the canvas and pass it to onFrame
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        onFrame(convertToRGB(resizeImageData(imageData)));
      }
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

import yogaVideo from '../assets/yoga.mp4'
import React, { useRef } from 'react';

function VideoPlayer({ video_url, props, onFrame }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleNewFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get the image data from the canvas and pass it to onFrame
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      console.log(imageData);
      onFrame(imageData);
    }
  };

  return (
    <div>
      {/* Video Player */}
      <div className={props.className}>
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
          onTimeUpdate={handleNewFrame}
        >
          <source src={yogaVideo} type="video/mp4" />
        </video>
      </div>

      {/* Canvas for capturing frames */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default VideoPlayer;

import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import ReactPlayer from 'react-player/youtube';

function VideoPlayer({ video_url, props, onFrame }) {
    const playerRef = useRef(null);
    const canvasRef = useRef(null);

    const handleNewFrame = (state) => {
      console.log(playerRef.current);
      html2canvas(playerRef.current).then((canvas) => {
        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL('image/png');
        onFrame(dataUrl);
      });
    }
    console.log(video_url)
    return (
      <div>
        {/* YouTube Video Player */}
        <div className={props.className}>
            <ReactPlayer
                ref={playerRef}
                url={video_url}
                playing={true}
                controls={false}
                width={props.width}
                height={props.height}
                progressInterval={10}
                
                onProgress={handleNewFrame}
                // config={{
                //     youtube: {
                //       playerVars: { showinfo: 0, controls: 0 }, // You can customize YouTube playerVars
                //     },
                // }}
            />
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    );
  }
  
  export default VideoPlayer;
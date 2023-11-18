import React, { useState, useEffect } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { CameraUtils } from '@mediapipe/camera_utils/camera_utils.js';
import { ControlUtils } from '@mediapipe/control_utils/control_utils.js';
import { DrawingUtils } from '@mediapipe/drawing_utils/drawing_utils.js';
import { Pose } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';

function Playback({ video_url, user_params }) {

    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;

    const handleTrainingVideoFrame = () => {

    }
    
    const handleWebcamFrame = () => {
        
    }

    return (
      <div>
        {/* Training Video Player */}
        <VideoPlayer
            video_url={video_url}
            props={trainingVideoProps}
            onFrame={handleTrainingVideoFrame}
        />
      
        {/* WEBCAM INPUT */}
        <VideoPlayer
            webcam={true}
            props={webcamPlayerProps}
            onFrame={handleWebcamFrame}
        />
        <video className="input_video5" style={{ display: 'none' }}></video>
  
        {/* MEDIAPIPE OUTPUT */}
        <canvas className="output5" width="1280px" height="720px"></canvas>
        <div style={{ visibility: 'hidden' }} className="control5"></div>
  
        {/* Add any other React components or logic as needed */}
      </div>
    );
  }
  
  export default Playback;
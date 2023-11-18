import React, { useState, useEffect } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { CameraUtils } from '@mediapipe/camera_utils/camera_utils.js';
import { ControlUtils } from '@mediapipe/control_utils/control_utils.js';
import { DrawingUtils } from '@mediapipe/drawing_utils/drawing_utils.js';
import { Pose } from '@mediapipe/pose/pose.js';
import ReactPlayer from 'react-player/youtube';

function Playback({ youtubeLink }) {
    return (
      <div>
        {/* YouTube Video Player */}
        <div className="main-player">
            <ReactPlayer url={youtubeLink} controls={true} />
        </div>
      
        {/* WEBCAM INPUT */}
        <video className="input_video5" style={{ display: 'none' }}></video>
  
        {/* MEDIAPIPE OUTPUT */}
        <canvas className="output5" width="1280px" height="720px"></canvas>
        <div style={{ visibility: 'hidden' }} className="control5"></div>
  
        {/* Add any other React components or logic as needed */}
      </div>
    );
  }
  
  export default Playback;
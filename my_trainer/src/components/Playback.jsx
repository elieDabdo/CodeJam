import React, { useState, useEffect } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { CameraUtils } from '@mediapipe/camera_utils/camera_utils.js';
import { ControlUtils } from '@mediapipe/control_utils/control_utils.js';
import { DrawingUtils } from '@mediapipe/drawing_utils/drawing_utils.js';
import { Pose } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';

function Playback({ video_url }) {

    // const playVideo = () => {
    //   if (playerRef.current) {
    //     playerRef.current.play();
    //   }
    // };
  
    // const pauseVideo = () => {
    //   if (playerRef.current) {
    //     playerRef.current.pause();
    //   }
    // };
  
    // const seekToTime = (timeInSeconds) => {
    //   if (playerRef.current) {
    //     playerRef.current.seekTo(timeInSeconds, 'seconds');
    //   }
    // };
  
    // const setVolume = (volume) => {
    //   if (playerRef.current) {
    //     playerRef.current.setVolume(volume);
    //   }
    // };
  
    // const setPlaybackSpeed = (speed) => {
    //   if (playerRef.current) {
    //     playerRef.current.setPlaybackRate(speed);
    //   }
    // };

    const youtubeMinimizedProps = {className:"min-player", height:'30%', width:'30%'};
    const youtubeMaximizedProps = {className:"max-player", height:'100vh', width:'100%'};

    return (
      <div>
        {/* YouTube Video Player */}
        <div className="main-player">
            <VideoPlayer
                video_url={video_url}
                props={youtubeMaximizedProps}
                onFrame={(frame) => console.log(frame)}
            />
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
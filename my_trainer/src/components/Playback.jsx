import React, { useRef, useEffect } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { Camera } from '@mediapipe/camera_utils/camera_utils.js';
import { DrawingUtils } from '@mediapipe/drawing_utils/drawing_utils.js';
import { Pose, VERSION } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';
import { displaySkeletonOnVideo, onWebcamPose, onTrainingPose } from '../PoseDetection.js'

// CREATE POSE DETECTOR OBJECTS
const trainingPose = await new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`
    });
const webcamPose = await new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`
    });

//SET OPTIONS
const poseOptions = {
        selfieMode: true,
        upperBodyOnly: false,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    }
    
trainingPose.setOptions(poseOptions);
webcamPose.setOptions(poseOptions);

// DEFINE POSE DETECTION CALLBACK FUNCTION
trainingPose.onResults(onTrainingPose);
webcamPose.onResults(onWebcamPose);

const detection_frame_rate = 10;
  
function Playback({ video_url, user_params }) {
    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;

    // DEFINE FRAME CALLBACKS
    const handleTrainingVideoFrame = async (video) => {
        await trainingPose.send({image: video})
        //run media pipe pose model on frame and get landmark information
    }
    
    // DEFINE FRAME CALLBACKS
    const handleWebcamVideoFrame = async (video) => {
        await trainingPose.send({image: video})
        //run media pipe pose model on frame and get landmark information
    }
    
    return (
      <div>
        {/* TRAINING VIDEO */}
        <VideoPlayer
            video_url={video_url}
            props={trainingVideoProps}
            onFrame={handleTrainingVideoFrame}
            detection_frame_rate={detection_frame_rate}
        />
      
        {/* WEBCAM INPUT */}
        <VideoPlayer
            webcam={true}
            props={webcamPlayerProps}
            onFrame={handleWebcamVideoFrame}
            detection_frame_rate={detection_frame_rate}
        />
      </div>
    );
  }
  
  export default Playback;
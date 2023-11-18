import React, { useRef } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { Pose } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';
import { onWebcamPose, onTrainingPose } from '../PoseDetection.js'

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


const detection_frame_rate = 7;
  
function Playback({ video_url, user_params }) {
    const webcamCanvasRef = useRef(null);
    const trainingCanvasRef = useRef(null);

    // DEFINE POSE DETECTION CALLBACK FUNCTION
    trainingPose.onResults((results) => onTrainingPose(results, webcamCanvasRef.current, trainingCanvasRef.current, user_params));
    webcamPose.onResults((results) => onWebcamPose(results, webcamCanvasRef.current, trainingCanvasRef.current, user_params));

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
        <div className={trainingVideoProps.className}>
            <canvas ref={trainingCanvasRef} width={trainingVideoProps.width} height={trainingVideoProps.height}></canvas>
        </div>
      
        {/* WEBCAM INPUT */}
        <VideoPlayer
            webcam={true}
            props={webcamPlayerProps}
            onFrame={handleWebcamVideoFrame}
            detection_frame_rate={detection_frame_rate}
        />
        <div className={webcamPlayerProps.className}>
            <canvas ref={webcamCanvasRef} width={webcamPlayerProps.width} height={webcamPlayerProps.height}></canvas>
        </div>
        
      </div>
    );
  }
  
  export default Playback;
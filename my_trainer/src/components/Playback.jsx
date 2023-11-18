import React, { useRef } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { Pose } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';
import { onWebcamPose, onTrainingPose } from '../visualization.js'

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
        minTrackingConfidence: 0.5,
        runningMode: "VIDEO",
    }
    
webcamPose.setOptions(poseOptions);
poseOptions.selfieMode = false;
trainingPose.setOptions(poseOptions);


const maximized_detection_frame_rate = 10;
const minimized_detection_frame_rate = 8;

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));
await wait();
  
function Playback({ video_url, user_params }) {
    const webcamCanvasRef = useRef(null);
    const trainingCanvasRef = useRef(null);

    // DEFINE POSE DETECTION CALLBACK FUNCTION
    trainingPose.onResults((results) => onTrainingPose(results, webcamCanvasRef.current.getContext('2d'), trainingCanvasRef.current.getContext('2d'), user_params));
    webcamPose.onResults((results) => onWebcamPose(results, webcamCanvasRef.current.getContext('2d'), trainingCanvasRef.current.getContext('2d'), user_params));

    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};
    
    const trainingVideoDetectionRate = user_params.training_video_maximized ? maximized_detection_frame_rate : minimized_detection_frame_rate;
    const webcamVideoDetectionRate = user_params.training_video_maximized ? minimized_detection_frame_rate : maximized_detection_frame_rate;

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;

    // DEFINE FRAME CALLBACKS
    const handleTrainingVideoFrame = async (video) => {
        await trainingPose.send({image: video})
        //run media pipe pose model on frame and get landmark information
    }
    
    // DEFINE FRAME CALLBACKS
    const handleWebcamVideoFrame = async (video) => {
        await webcamPose.send({image: video})
        //run media pipe pose model on frame and get landmark information
    }
    
    return (
      <div>
        <div className='videos'>
            <canvas ref={trainingCanvasRef} className={trainingVideoProps.className} style={{zIndex: 11, pointerEvents: 'none'}}></canvas>
            <canvas ref={webcamCanvasRef} className={webcamPlayerProps.className} style={{zIndex: 11, pointerEvents: 'none'}}></canvas>
            {/* TRAINING VIDEO */}
            <VideoPlayer
                video_url={video_url}
                props={trainingVideoProps}
                onFrame={handleTrainingVideoFrame}
                detection_frame_rate={trainingVideoDetectionRate}
                canvasRef={trainingCanvasRef}
            />
        
            {/* WEBCAM INPUT */}
            <VideoPlayer
                webcam={true}
                props={webcamPlayerProps}
                onFrame={handleWebcamVideoFrame}
                detection_frame_rate={webcamVideoDetectionRate}
                canvasRef={webcamCanvasRef}
            />
        </div>
      </div>
    );
  }
  
  export default Playback;
import React, { useRef, useEffect } from 'react';
import '@mediapipe/control_utils/control_utils.css';
import { Camera } from '@mediapipe/camera_utils/camera_utils.js';
import { ControlUtils } from '@mediapipe/control_utils/control_utils.js';
import { DrawingUtils } from '@mediapipe/drawing_utils/drawing_utils.js';
import { Pose } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';
import { displaySkeletonOnVideo, onWebcamPose, onTrainingPose } from '../PoseDetection.js'

function Playback({ video_url, user_params }) {
    const videoRef = useRef(null);

    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;
    
    let trainingPose = {send: () => {}};
    let webcamPose = {send: () => {}};

    useEffect(() => {
        const videoElement = videoRef.current;
    
        const camera = new Camera(videoElement, {
            onFrame: async () => {
            console.log(videoElement);
            console.log(typeof videoElement);
            // You can use webcamPose.send({ image: videoElement }) here
            },
            width: webcamPlayerProps.width,
            height: webcamPlayerProps.height,
        });
    
        camera.start();
        
        // CREATE POSE DETECTOR OBJECTS
        trainingPose = new Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`
        });
        webcamPose = new Pose({
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
        
        // Cleanup function (optional) to be executed on component unmount
        return () => {
            camera.stop();
        };
      }, []); // Empty dependency array ensures that this effect runs only once

    // DEFINE FRAME CALLBACKS
    const handleTrainingVideoFrame = async (video) => {
        console.log(typeof video)
        console.log(video)
        // trainingPose.send({image: frame})
        //run media pipe pose model on frame and get landmark information
    }
    
    const handleWebcamFrame = async (video) => {
        console.log(typeof video)
        console.log(video)
        webcamPose.send({image: video})
        //run media pipe pose model on frame and get landmark information
    }
    return (
      <div>
        {/* TRAINING VIDEO */}
        <VideoPlayer
            webcam={false}
            video_url={video_url}
            props={trainingVideoProps}
            onFrame={handleTrainingVideoFrame}
        />
      
        {/* WEBCAM INPUT */}
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
      </div>
    );
  }
  
  export default Playback;
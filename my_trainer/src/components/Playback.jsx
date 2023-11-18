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

let init = false;
  
function Playback({ video_url, user_params }) {
    const webcamRef = useRef(null);

    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;


    useEffect(() => {
        if (init) return () => {};
        init = true;
        console.log(webcamRef.current);
        
        const camera = new Camera(webcamRef.current, {
            onFrame: async () => {
                // console.log("webcam frame");
                // if (webcamRef.current.videoWidth) webcamPose.send({ image: webcamRef.current })
            },
            width: 1280,
            height: 720,
        });
    
        camera.start();
        
        // Cleanup function (optional) to be executed on component unmount
        return () => {
            camera.stop();
        };
      });

    // DEFINE FRAME CALLBACKS
    const handleTrainingVideoFrame = async (video) => {
        console.log(video);
        console.log(video.videoWidth)
        trainingPose.send({image: video})
        //run media pipe pose model on frame and get landmark information
    }
    
    return (
      <div>
        {/* TRAINING VIDEO */}
        <VideoPlayer
            video_url={video_url}
            props={trainingVideoProps}
            onFrame={handleTrainingVideoFrame}
        />
      
        {/* WEBCAM INPUT */}
        <div className={webcamPlayerProps.className}>
            <video
                className='input_video'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'scaleX(-1)',
                }}
                ref={webcamRef}
                controls={false}
                autoPlay={true}
            ></video>
        </div>
      </div>
    );
  }
  
  export default Playback;
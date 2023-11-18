import React, { useRef, useEffect } from 'react';
import { Tensor, InferenceSession } from "onnxruntime-web";
import VideoPlayer from './VideoPlayer';
import { displaySkeletonOnVideo, onWebcamPose, onTrainingPose } from '../PoseDetection.js'
import YOLO from "./yolov8n-pose.onnx"

console.log("imported")

// LOAD ONNX MODEL
const session = await InferenceSession.create(
    YOLO,
    {
      executionProviders: ["webgl"],
    }
  );
  
function Playback({ video_url, user_params }) {
    const webcamRef = useRef(null);

    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;

    // DEFINE FRAME CALLBACKS
    const handleTrainingVideoFrame = async (frame) => {
        // console.log("training frame");
        // trainingPose.send({image: frame})
        //run media pipe pose model on frame and get landmark information
    }
    
    // DEFINE FRAME CALLBACKS
    const handleWebcamVideoFrame = async (frame) => {
        console.log("webcam frame");
        console.log(frame);

        //need to modify code where it checks for scale or sizes and just use sizes!!

        const frameTensor = new Tensor("float32", frame.data, [1, 3, frame.height, frame.width]);

        const inputs = {
            "images": frameTensor
        }
        const outputMap = await session.run(inputs);
        // const outputTensor = outputMap.values().next().value;
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
        <VideoPlayer
            webcam={true}
            video_url={video_url}
            props={webcamPlayerProps}
            onFrame={handleWebcamVideoFrame}
        />
      </div>
    );
  }
  
  export default Playback;
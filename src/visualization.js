import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils/drawing_utils.js';

// landmarks to be drawn on the training video
const webcamLandmarks = {
    "webcam" : [], //origin of landmarks
    "training": []
}

// landmarks to be drawn on the training video
const trainingLandmarks = {
    "webcam" : null, //origin of landmarks
    "training": null
}

const latestImages = {
    "webcam": null,
    "training": null
}

const POSE_CONNECTIONS = []
POSE_CONNECTIONS.push([1,2]) // indices for vertices to connect

//////// VISUALIZATION PARAMETERS

const trainerJointColor = '#03c2fc';
const trainerJointFillColor = '#03c2fc';
const trainerJointLineWidth = 1;
const trainerJointRadius = 1; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const trainerJointDesign = {color:trainerJointColor, fillColor:trainerJointFillColor, lineWidth:trainerJointLineWidth, radius:trainerJointRadius}

const trainerLimbColor = '#03c2fc';
const trainerLimbFillColor = '#03c2fc';
const trainerLimbLineWidth = 1;
const trainerLimbRadius = 1; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const trainerLimbDesign = {color:trainerLimbColor, fillColor:trainerLimbFillColor, lineWidth:trainerLimbLineWidth, radius:trainerLimbRadius}

const userJointColor = '#ecfc03';
const userJointFillColor = '#ecfc03';
const userJointLineWidth = 1;
const userJointRadius = 1; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const userJointDesign = {color:userJointColor, fillColor:userJointFillColor, lineWidth:userJointLineWidth, radius:userJointRadius}

const userLimbColor = '#ecfc03';
const userLimbFillColor = '#ecfc03';
const userLimbLineWidth = 1;
const userLimbRadius = 1; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const userLimbDesign = {color:userLimbColor, fillColor:userLimbFillColor, lineWidth:userLimbLineWidth, radius:userLimbRadius}

///////////////////////

// DrawingOptions
// color	string | CanvasGradient | CanvasPattern | Callback<LandmarkData, string | CanvasGradient | CanvasPattern>	The color that is used to draw the shape. Defaults to white.
// fillColor	string | CanvasGradient | CanvasPattern | Callback<LandmarkData, string | CanvasGradient | CanvasPattern>	The color that is used to fill the shape. Defaults to .color (or black if color is not set).
// lineWidth	number | Callback<LandmarkData, number>	The width of the line boundary of the shape. Defaults to 4.
// radius	number | Callback<LandmarkData, number>	The radius of location marker. Defaults to 6.

const displaySkeletonsOnCanvas = (canvas, landmarks, image) => {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    // canvas.drawImage(image, 0, 0, canvas.canvas.width, canvas.canvas.height);
    if (landmarks.webcam) {  //display webcam landmarks
        drawConnectors(canvas, landmarks.webcam, POSE_CONNECTIONS, userLimbDesign);
        drawLandmarks(canvas, landmarks.webcam, userJointDesign);
    }
    if (landmarks.training) { //display training landmarks
        drawConnectors(canvas, landmarks.training, POSE_CONNECTIONS, trainerLimbDesign);
        drawLandmarks(canvas, landmarks.training, trainerJointDesign);
    }
    canvas.save();
}

const onWebcamPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    latestImages.webcam = detection.image;
    if (!detection.poseLandmarks) {
        console.log("webcam didnt detect")
        webcamLandmarks.webcam = null;
        trainingLandmarks.webcam = null;
    }
    if (user_params.draw_webcam_skeleton_on_webcam) {
        webcamLandmarks.webcam = detection.poseLandmarks;
        displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks, latestImages.webcam)
    }

    if (user_params.draw_webcam_skeleton_on_training) {
        trainingLandmarks.webcam = detection.poseLandmarks;
        if (latestImages.training) displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks, latestImages.training)
    }
}

const onTrainingPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    latestImages.training = detection.image;
    if (!detection.poseLandmarks) {
        console.log("training didnt detect")
        webcamLandmarks.training = null;
        trainingLandmarks.training = null;
    }
    if (user_params.draw_training_skeleton_on_webcam) {
        webcamLandmarks.training = detection.poseLandmarks;
        if (latestImages.webcam) displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks, latestImages.webcam)
    }
    
    if (user_params.draw_training_skeleton_on_training) {
        trainingLandmarks.training = detection.poseLandmarks;
        displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks, latestImages.training)
    }
}

export {onWebcamPose, onTrainingPose};
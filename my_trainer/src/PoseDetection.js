import { drawConnectors, drawLandmarks, Connection } from '@mediapipe/drawing_utils/drawing_utils.js';

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

POSE_CONNECTIONS = Connection()
POSE_CONNECTIONS.add(1,2) // indices for vertices to connect

//////// VISUALIZATION PARAMETERS

const trainerJointColor = '#03c2fc';
const trainerJointFillColor = '#03c2fc';
const trainerJointLineWidth = '#03c2fc';
const trainerJointRadius = '#03c2fc'; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const trainerJointDesign = {color:trainerJointColor, fillColor:trainerJointFillColor, lineWidth:trainerJointLineWidth, radius:trainerJointRadius}

const trainerLimbColor = '#03c2fc';
const trainerLimbFillColor = '#03c2fc';
const trainerLimbLineWidth = '#03c2fc';
const trainerLimbRadius = '#03c2fc'; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const trainerLimbDesign = {color:trainerLimbColor, fillColor:trainerLimbFillColor, lineWidth:trainerLimbLineWidth, radius:trainerLimbRadius}

const userJointColor = '#03c2fc';
const userJointFillColor = '#03c2fc';
const userJointLineWidth = '#03c2fc';
const userJointRadius = '#03c2fc'; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const userJointDesign = {color:userJointColor, fillColor:userJointFillColor, lineWidth:userJointLineWidth, radius:userJointRadius}

const userLimbColor = '#03c2fc';
const userLimbFillColor = '#03c2fc';
const userLimbLineWidth = '#03c2fc';
const userLimbRadius = '#03c2fc'; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const userLimbDesign = {color:userLimbColor, fillColor:userLimbFillColor, lineWidth:userLimbLineWidth, radius:userLimbRadius}

///////////////////////

// DrawingOptions
// color	string | CanvasGradient | CanvasPattern | Callback<LandmarkData, string | CanvasGradient | CanvasPattern>	The color that is used to draw the shape. Defaults to white.
// fillColor	string | CanvasGradient | CanvasPattern | Callback<LandmarkData, string | CanvasGradient | CanvasPattern>	The color that is used to fill the shape. Defaults to .color (or black if color is not set).
// lineWidth	number | Callback<LandmarkData, number>	The width of the line boundary of the shape. Defaults to 4.
// radius	number | Callback<LandmarkData, number>	The radius of location marker. Defaults to 6.

const displaySkeletonsOnCanvas = (canvas, landmarks, image) => {
    canvas.save();
    canvas.clearRect(0, 0, out5.width, out5.height);
    canvas.drawImage(results.image, 0, 0, out5.width, out5.height);
    if (landmarks.webcam) {  //display webcam landmarks
        drawConnectors(canvas, landmarks.webcam, POSE_CONNECTIONS, userLimbDesign);
        drawLandmarks(canvas, landmarks.webcam, userJointDesign);
    }
    if (landmarks.training) { //display training landmarks
        drawConnectors(canvas, landmarks.training, POSE_CONNECTIONS, trainerLimbDesign);
        drawLandmarks(canvas, landmarks.training, trainerJointDesign);
    }
    canvas.restore();
}

const onWebcamPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    console.log(detection)
    latestImages.webcam = detection.image;
    if (!detection.poseLandmarks) {
        console.log("webcam")
        webcamLandmarks.webcam = null;
        trainingLandmarks.webcam = null;
        // clear canvas that this feed draws on
    } else {
        if (user_params.draw_webcam_skeleton_on_webcam) {
            webcamLandmarks.webcam = detection.poseLandmarks;
            displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks)
        }

        if (user_params.draw_webcam_skeleton_on_training) {
            trainingLandmarks.webcam = detection.poseLandmarks;
            if (latestImages.training) displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks)
        }
    }
}

const onTrainingPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    console.log(detection)
    latestImages.training = detection.image;
    if (!detection.poseLandmarks) {
        console.log("training")
        webcamLandmarks.training = null;
        trainingLandmarks.training = null;
        // clear canvas that this feed draws on
    } else {
        if (user_params.draw_training_skeleton_on_webcam) {
            webcamLandmarks.training = detection.poseLandmarks;
            if (latestImages.webcam) displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks)
        }
        
        if (user_params.draw_training_skeleton_on_training) {
            trainingLandmarks.training = detection.poseLandmarks;
            displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks)
        }
    }
}

export {onWebcamPose, onTrainingPose};
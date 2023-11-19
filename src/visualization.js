import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils/drawing_utils.js';

// landmarks to be drawn on the training video
const webcamLandmarks = {
    "webcam" : null, //origin of landmarks
    "training": null
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

const latestPoses = {
    "webcam": null,
    "training": null
}

const jointQualities = null;

//////// VISUALIZATION PARAMETERS

const POSE_CONNECTIONS = []
POSE_CONNECTIONS.push([0,1]) // head to neck
POSE_CONNECTIONS.push([2,1]) // neck to shoulder left
POSE_CONNECTIONS.push([3,1]) // neck to shoulder right
POSE_CONNECTIONS.push([2,4]) // shoulder left to elbow left
POSE_CONNECTIONS.push([3,5]) // shoulder right to elbow right
POSE_CONNECTIONS.push([6,4]) // hand left to elbow left
POSE_CONNECTIONS.push([7,5]) // hand right to elbow right

POSE_CONNECTIONS.push([2,8]) // shoulder left to hip left
POSE_CONNECTIONS.push([3,9]) // shoulder right to hip right
POSE_CONNECTIONS.push([10,8]) // hip left to knee left
POSE_CONNECTIONS.push([11,9]) // hip right to knee right
POSE_CONNECTIONS.push([9,8]) // hip left to hip left
POSE_CONNECTIONS.push([10,12]) // ankle left to knee left
POSE_CONNECTIONS.push([11,13]) // ankle right to knee right
POSE_CONNECTIONS.push([14,12]) // ankle left to toes left
POSE_CONNECTIONS.push([15,13]) // ankle right to toes right

const POSE_ENDPOINTS = [0, 6, 7];

const trainerJointColor = '#03c2fc';
const trainerJointFillColor = '#03c2fc';
const trainerJointLineWidth = 1;
const trainerJointRadius = 1; // NOTE: THESE CAN ALSO BE FUNCTIONS OF DATA (WHERE DATA IS THE POINT)
const trainerJointDesign = {color:trainerJointColor, fillColor:trainerJointFillColor, lineWidth:trainerJointLineWidth, radius:trainerJointRadius}
const trainerJointEndpointDesign = {color:trainerJointColor, fillColor:trainerJointFillColor, lineWidth:trainerJointLineWidth, radius:3}

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
const userJointEndpointDesign = {color:userJointColor, fillColor:userJointFillColor, lineWidth:userJointLineWidth, radius:3}

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
        console.log(POSE_ENDPOINTS.map(index => landmarks.webcam[index]));
        drawLandmarks(canvas, POSE_ENDPOINTS.map(index => landmarks.webcam[index]), userJointEndpointDesign);
        drawLandmarks(canvas, landmarks.webcam, userJointDesign);
    }
    if (landmarks.training) { //display training landmarks
        drawConnectors(canvas, landmarks.training, POSE_CONNECTIONS, trainerLimbDesign);
        console.log(POSE_ENDPOINTS.map(index => landmarks.training[index]));
        drawLandmarks(canvas, POSE_ENDPOINTS.map(index => landmarks.training[index]), trainerJointEndpointDesign);
        drawLandmarks(canvas, landmarks.training, trainerJointDesign);
    }
    canvas.save();
}

const processDetection = (detection) => { 
    if (!detection.poseLandmarks) {
        return { poseLandmarks: undefined };
    }
    const newDetection = {
        poseLandmarks: [],
        image: detection.image,
        namedTuples: []
    };

    const avgPoint = (p1,p2) => {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
            z: (p1.z + p2.z) / 2,
            visibility: Math.max(p1.visibility, p2.visibility)
        };
    };
    
    const avgThreePoints = (p1,p2,p3) => {
        return {
            x: (p1.x + p2.x + p3.x) / 3,
            y: (p1.y + p2.y + p3.y) / 3,
            z: (p1.z + p2.z + p3.z) / 3,
            visibility: Math.max(p1.visibility, p2.visibility, p3.visibility)
        };
    };

    //////// NEW MAPPING (LEFT AS IN WHEN LOOKING AT THE PERSON, NOT THEIR POV)
    // 0 HEAD (take average between left and right ears)
    const leftEar = detection.poseLandmarks[8];
    const rightEar = detection.poseLandmarks[7];
    newDetection.poseLandmarks.push(avgPoint(leftEar, rightEar))
    // 1 NECK BASE (take average between left and right ears)
    const leftShoulder = detection.poseLandmarks[12];
    const rightShoulder = detection.poseLandmarks[11];
    newDetection.poseLandmarks.push(avgPoint(leftShoulder, rightShoulder))
    // 2 SHOULDER LEFT
    newDetection.poseLandmarks.push(leftShoulder)
    // 3 SHOULDER RIGHT
    newDetection.poseLandmarks.push(rightShoulder)
    // 4 ELBOW LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[14])
    // 5 ELBOW RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[13])
    // 6 HAND LEFT
    const handLeftPoint1 = detection.poseLandmarks[16];
    const handLeftPoint2 = detection.poseLandmarks[18];
    const handLeftPoint3 = detection.poseLandmarks[20];
    newDetection.poseLandmarks.push(avgThreePoints(handLeftPoint1,handLeftPoint2,handLeftPoint3))
    // 7 HAND RIGHT
    const handRightPoint1 = detection.poseLandmarks[15];
    const handRightPoint2 = detection.poseLandmarks[17];
    const handRightPoint3 = detection.poseLandmarks[19];
    newDetection.poseLandmarks.push(avgThreePoints(handRightPoint1,handRightPoint2,handRightPoint3))
    // 8 HIP LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[24])
    // 9 HIP RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[23])
    // 10 KNEE LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[26])
    // 11 KNEE RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[25])
    // 12 ANKLE LEFT
    const ankleLeftUpper = detection.poseLandmarks[28];
    const ankleLeftLower = detection.poseLandmarks[30];
    newDetection.poseLandmarks.push(avgPoint(ankleLeftUpper, ankleLeftLower))
    // 13 ANKLE RIGHT
    const ankleRightUpper = detection.poseLandmarks[27];
    const ankleRightLower = detection.poseLandmarks[29];
    newDetection.poseLandmarks.push(avgPoint(ankleRightUpper, ankleRightLower))
    // 14 TOES LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[32])
    // 15 TOES RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[31])

    return newDetection;
}

const onWebcamPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    let processedDetection = processDetection(detection);
    latestImages.webcam = processedDetection.image;
    if (!processedDetection.poseLandmarks) {
        console.log("webcam didnt detect")
        webcamLandmarks.webcam = null;
        trainingLandmarks.webcam = null;
    } else {
        latestPoses.webcam = processedDetection.poseLandmarks;
        // jointQualities = computeJointQualities(latestPoses);
    }
    if (user_params.draw_webcam_skeleton_on_webcam) {
        webcamLandmarks.webcam = processedDetection.poseLandmarks;
        displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks, latestImages.webcam)
    }

    if (user_params.draw_webcam_skeleton_on_training) {
        trainingLandmarks.webcam = processedDetection.poseLandmarks;
        if (latestImages.training) displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks, latestImages.training)
    }
}

const onTrainingPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    let processedDetection = processDetection(detection);
    latestImages.training = processedDetection.image;
    if (!processedDetection.poseLandmarks) {
        console.log("training didnt detect")
        webcamLandmarks.training = null;
        trainingLandmarks.training = null;
    } else {
        latestPoses.training = processedDetection.poseLandmarks;
        // jointQualities = computeJointQualities(latestPoses);
    }
    if (user_params.draw_training_skeleton_on_webcam) {
        webcamLandmarks.training = processedDetection.poseLandmarks;
        if (latestImages.webcam) displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks, latestImages.webcam)
    }
    
    if (user_params.draw_training_skeleton_on_training) {
        trainingLandmarks.training = processedDetection.poseLandmarks;
        displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks, latestImages.training)
    }
}

export {onWebcamPose, onTrainingPose};
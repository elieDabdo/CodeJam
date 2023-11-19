import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils/drawing_utils.js';
import { correctSkeletons, computeJointDistances } from './process.js';

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

const latestPoses = {
    "webcam": null,
    "training": null
}

let shoulderNeckDistance = null;
let jointDistances = null;


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

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

const displaySkeletonsOnCanvas = (canvas, landmarks) => {

    const maxDist = shoulderNeckDistance;
    const minDist = 0.0;

    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    if (landmarks.webcam) {  //display webcam landmarks
        if (jointDistances) {
            for (let i in landmarks.webcam) {
                const joint_punishment = (clamp(jointDistances[i], minDist, maxDist) - minDist) / maxDist;
                const col = `rgba(${255 * joint_punishment}, ${255 * (1 - joint_punishment)}, 0, 1)`;
                drawLandmarks(canvas, POSE_ENDPOINTS.map(index => landmarks.webcam[index]), {color:col, fillColor:col, lineWidth:userJointEndpointDesign.lineWidth, radius:userJointEndpointDesign.radius });
                drawLandmarks(canvas, landmarks.webcam, {color:col, fillColor:col, lineWidth:userJointDesign.lineWidth, radius:userJointDesign.radius });
                
                drawConnectors(canvas, landmarks.webcam, POSE_CONNECTIONS, userLimbDesign);
                // drawConnectors(canvas, landmarks.webcam, POSE_CONNECTIONS, {
                //     color: (data) => {
                //       const x0 = out5.width * data.from.x;
                //       const y0 = out5.height * data.from.y;
                //       const x1 = out5.width * data.to.x;
                //       const y1 = out5.height * data.to.y;

                //       const col0 = `rgba(${255 * ((clamp(jointDistances[i], minDist, maxDist) - minDist) / maxDist)}, ${255 * (1 - ((clamp(jointDistances[i], minDist, maxDist) - minDist) / maxDist))}, 0, 1)`;
                //       const col0 = `rgba(${255 * ((clamp(jointDistances[i], minDist, maxDist) - minDist) / maxDist)}, ${255 * (1 - ((clamp(jointDistances[i], minDist, maxDist) - minDist) / maxDist))}, 0, 1)`;
            
                //       const gradient = canvas.createLinearGradient(x0, y0, x1, y1);
                //       gradient.addColorStop(
                //           0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                //       gradient.addColorStop(
                //           1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                //       return gradient;
                //     },
                //     lineWidth: userJointDesign.lineWidth,
                //     radius: userJointDesign.radius
                //   });
            }
        } else {
            drawConnectors(canvas, landmarks.webcam, POSE_CONNECTIONS, userLimbDesign);
            drawLandmarks(canvas, POSE_ENDPOINTS.map(index => landmarks.webcam[index]), userJointEndpointDesign);
            drawLandmarks(canvas, landmarks.webcam, userJointDesign);
        }
    }
    if (landmarks.training) { //display training landmarks
        drawConnectors(canvas, landmarks.training, POSE_CONNECTIONS, trainerLimbDesign);
        drawLandmarks(canvas, POSE_ENDPOINTS.map(index => landmarks.training[index]), trainerJointEndpointDesign);
        drawLandmarks(canvas, landmarks.training, trainerJointDesign);
    }
    canvas.save();
}

const indexNameMappings = [
    "head",
    "neck_base",
    "left_shoulder",
    "right_shoulder",
    "left_elbow",
    "right_elbow",
    "left_hand",
    "right_hand",
    "left_hip",
    "right_hip",
    "left_knee",
    "right_knee",
    "left_ankle",
    "right_ankle",
    "left_toes",
    "right_toes"
]

const encodeLandmarks = (landmarks) => {
    const encoded = [];
    for (let i = 0; i < landmarks.length; i++) {
        const element = [indexNameMappings[i], [landmarks[i].x, landmarks[i].y, landmarks[i].z], landmarks[i].visibility]
        encoded.push(element);
    }
    return encoded;
}

const decodeLandmarks = (landmarks) => {
    const decoded = new Array(16).fill(null);
    for (let i = 0; i < landmarks.length; i++) {
        const element = {
            x: landmarks[i][1][0],
            y: landmarks[i][1][1],
            z: landmarks[i][1][2],
            visibility: landmarks[i][2]
        };
        decoded[indexNameMappings.indexOf(landmarks[i][0])] = element;
    }
    return decoded;
}

const processDetection = (detection) => { 
    if (!detection.poseLandmarks) {
        return { poseLandmarks: undefined };
    }
    const newDetection = {
        poseLandmarks: []
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
    newDetection.poseLandmarks.push(avgPoint(leftEar, rightEar));
    // 1 NECK BASE (take average between left and right ears)
    const leftShoulder = detection.poseLandmarks[12];
    const rightShoulder = detection.poseLandmarks[11];
    newDetection.poseLandmarks.push(avgPoint(leftShoulder, rightShoulder));
    // 2 SHOULDER LEFT
    newDetection.poseLandmarks.push(leftShoulder);
    // 3 SHOULDER RIGHT
    newDetection.poseLandmarks.push(rightShoulder);
    // 4 ELBOW LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[14]);
    // 5 ELBOW RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[13]);
    // 6 HAND LEFT
    const handLeftPoint1 = detection.poseLandmarks[16];
    const handLeftPoint2 = detection.poseLandmarks[18];
    const handLeftPoint3 = detection.poseLandmarks[20];
    newDetection.poseLandmarks.push(avgThreePoints(handLeftPoint1,handLeftPoint2,handLeftPoint3));
    // 7 HAND RIGHT
    const handRightPoint1 = detection.poseLandmarks[15];
    const handRightPoint2 = detection.poseLandmarks[17];
    const handRightPoint3 = detection.poseLandmarks[19];
    newDetection.poseLandmarks.push(avgThreePoints(handRightPoint1,handRightPoint2,handRightPoint3));
    // 8 HIP LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[24]);
    // 9 HIP RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[23]);
    // 10 KNEE LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[26]);
    // 11 KNEE RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[25]);
    // 12 ANKLE LEFT
    const ankleLeftUpper = detection.poseLandmarks[28];
    const ankleLeftLower = detection.poseLandmarks[30];
    newDetection.poseLandmarks.push(avgPoint(ankleLeftUpper, ankleLeftLower));
    // 13 ANKLE RIGHT
    const ankleRightUpper = detection.poseLandmarks[27];
    const ankleRightLower = detection.poseLandmarks[29];
    newDetection.poseLandmarks.push(avgPoint(ankleRightUpper, ankleRightLower));
    // 14 TOES LEFT
    newDetection.poseLandmarks.push(detection.poseLandmarks[32]);
    // 15 TOES RIGHT
    newDetection.poseLandmarks.push(detection.poseLandmarks[31]);

    return newDetection;
}

const onWebcamPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    let processedDetection = processDetection(detection);
    if (!processedDetection.poseLandmarks) {
        console.log("webcam didnt detect")
        webcamLandmarks.webcam = null;
        trainingLandmarks.webcam = null;
    } else {
        latestPoses.webcam = processedDetection.poseLandmarks;
        if (latestPoses.training) {
            let distanceInfo = computeJointDistances(decodeLandmarks(correctSkeletons(encodeLandmarks(latestPoses.webcam), encodeLandmarks(latestPoses.training))), latestPoses.training);
            jointDistances = distanceInfo.d;
            shoulderNeckDistance = distanceInfo.sn;
        } 
    }
    if (user_params.draw_webcam_skeleton_on_webcam) {
        webcamLandmarks.webcam = processedDetection.poseLandmarks;
        displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks);
    }

    if (user_params.draw_webcam_skeleton_on_training) {
        
        trainingLandmarks.webcam = (trainingLandmarks.training && processedDetection.poseLandmarks) ? decodeLandmarks(correctSkeletons(encodeLandmarks(processedDetection.poseLandmarks), encodeLandmarks(trainingLandmarks.training))) : processedDetection.poseLandmarks;
        displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks);
    }
}

const onTrainingPose = (detection, webCamCanvas, trainingCanvas, user_params) => {
    let processedDetection = processDetection(detection);
    if (!processedDetection.poseLandmarks) {
        console.log("training didnt detect")
        webcamLandmarks.training = null;
        trainingLandmarks.training = null;
    } else {
        latestPoses.training = processedDetection.poseLandmarks;
        if (latestPoses.webcam) {
            let distanceInfo = computeJointDistances(decodeLandmarks(correctSkeletons(encodeLandmarks(latestPoses.webcam), encodeLandmarks(latestPoses.training))), latestPoses.training);
            jointDistances = distanceInfo.d;
            shoulderNeckDistance = distanceInfo.sn;
        }
    }
    if (user_params.draw_training_skeleton_on_webcam) {
        webcamLandmarks.training = (webcamLandmarks.webcam && processedDetection.poseLandmarks) ? decodeLandmarks(correctSkeletons(encodeLandmarks(processedDetection.poseLandmarks), encodeLandmarks(webcamLandmarks.webcam))) : processedDetection.poseLandmarks;
        displaySkeletonsOnCanvas(webCamCanvas, webcamLandmarks);
    }
    
    if (user_params.draw_training_skeleton_on_training) {
        trainingLandmarks.training = processedDetection.poseLandmarks;
        displaySkeletonsOnCanvas(trainingCanvas, trainingLandmarks);
    }
}

export {onWebcamPose, onTrainingPose};
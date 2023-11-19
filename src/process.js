
const confidence_threshold = 0.5;

function angle(v1, v2, z_scale) {
    v1[v1.length - 1] /= z_scale;
    v2[v2.length - 1] /= z_scale;

    let dot = 0;
    for (let i = 0; i < v1.length; i++) {
        dot += v1[i] * v2[i];
    }

    const norm1 = Math.sqrt(v1.reduce((acc, val) => acc + val ** 2, 0));
    const norm2 = Math.sqrt(v2.reduce((acc, val) => acc + val ** 2, 0));

    //console.log(dot / (norm1 * norm2));
    return Math.acos(dot / (norm1 * norm2));
}


function getMiddlePointX(p1, p2) {
    return (p1[0] + p2[0]) / 2;
}

function getVectorDistance(p1, p2) {
    const out = [];
    for (let i = 0; i < p1.length; i++) {
        out.push(p2[i] - p1[i]);
    }
    return Math.sqrt(out[0]*out[0] + out[1]*out[1] + out[2]*out[2]);
}

function sortLandmarks(landmarks,index) {
    // sort lowest to highest
    return landmarks.sort(function(a,b) {
        return b[index] - a[index];
    });
}

// for aligning the skeletons x, take hips then shoulders than head

// for aligning the skeletons y, take the lowest point excluding the hands

function getConfidence(landmarks,key) {
    for (let i in landmarks) {
        if (landmarks[i][0] === key) {
            return landmarks[i][2];
        }
    }
}

function getCoordinates(landmarks,key) {
    for (let i in landmarks) {
        if (landmarks[i][0] === key) {
            return landmarks[i][1];
        }
    }
}

function alignSkeletons(move, reference) {
    const moveAlignedX = alignSkeletonX(move, reference);
    const moveAlignedXY = alignSkeletonY(moveAlignedX, reference);
    return moveAlignedXY;
}

function isConfidentInBoth(move, reference, key) {
    return getConfidence(move,key) > confidence_threshold && getConfidence(reference,key) > confidence_threshold;
}

function shiftCoordinates(point,offset) {
    const newPoint = [];
    for(let i in point) {
        newPoint.push(point[i] + offset[i]);
    }
    return newPoint;
}

//need to make getMiddlePoint only get X
function alignSkeletonX(move, reference) {
    // check hip confidence greater than threshold
    let middleMove;
    let middleReference;
    if(isConfidentInBoth(move,reference,"left_hip") && isConfidentInBoth(move,reference,"right_hip")) {
        //if confident, grab middle point
        middleMove = getMiddlePointX(getCoordinates(move,"left_hip"),getCoordinates(move,"right_hip"));
        middleReference = getMiddlePointX(getCoordinates(reference,"left_hip"),getCoordinates(reference,"right_hip"));
    }
    // check shoulder confidence greater than threshold
    else if(isConfidentInBoth(move,reference,"left_shoulder") && isConfidentInBoth(move,reference,"right_shoulder")) {
        //if confident, grab middle point
        middleMove = getMiddlePointX(getCoordinates(move,"left_shoulder"),getCoordinates(move,"right_shoulder"));
        middleReference = getMiddlePointX(getCoordinates(reference,"left_shoulder"),getCoordinates(reference,"right_shoulder"));
    }
    else if(isConfidentInBoth(move,reference,"head")) {
        middleMove = getMiddlePointX(move,"head");
        middleReference = getMiddlePointX(reference,"head");
    }
    else{
        //throw exception???
    }

    const offset = [middleReference - middleMove,0,0];
    //shift every landmark in move by the difference
    let moveAlignedX = [];
    for(let i in move) {
        moveAlignedX.push([move[i][0],shiftCoordinates(move[i][1],offset),move[i][2]]);
    }
    return moveAlignedX;

}

function getLowestPointNotHands(landmarks) {
    for(let i in landmarks) {
        if(landmarks[i][0] !== "left_hand" && landmarks[i][0] !== "right_hand" && landmarks[i][2] >= confidence_threshold) {
            return landmarks[i][1];
        }
    }
    return landmarks[0][1];
}

function alignSkeletonY(move, reference) {
    // sort both skeletons
    let moveSorted = sortLandmarks(move,1);
    let referenceSorted = sortLandmarks(reference,1);
    // find the lowest point excluding the hands

    // gotta make this not get the hands
    let lowestMoveCoordinates = getLowestPointNotHands(moveSorted);
    let lowestReferenceCoordinates = getLowestPointNotHands(referenceSorted);
    
    let offset = [0,lowestReferenceCoordinates[1] - lowestMoveCoordinates[1],0];

    let moveAlignedY = [];
    for(let i in move) {
        moveAlignedY.push([move[i][0],shiftCoordinates(move[i][1],offset),move[i][2]]);
    }
    return moveAlignedY;

    // shift every landmark in move by the difference
}

const indexNameMappings = [
    // "head",
    "neck_base",
    "left_shoulder",
    "right_shoulder",
    // "left_elbow",
    // "right_elbow",
    // "left_hand",
    // "right_hand",
    "left_hip",
    "right_hip",
    // "left_knee",
    // "right_knee",
    // "left_ankle",
    // "right_ankle",
    // "left_toes",
    // "right_toes"
]

function scaleSkeletons(move,reference) {
    let weighted_scale = 0;
    let accumulated_weight = 0;
    for (const landmark1 of indexNameMappings) {
        for (const landmark2 of indexNameMappings) {
            if (landmark1 === landmark2) continue;
            let moveDistance = getVectorDistance(getCoordinates(move,landmark1),getCoordinates(move,landmark2));
            let referenceDistance = getVectorDistance(getCoordinates(reference,landmark1),getCoordinates(reference,landmark2));
            let scale = referenceDistance / moveDistance;
            let confidence = Math.min(move.find((d) => d[0] === landmark1)[2], move.find((d) => d[0] === landmark2)[2]);
            if (confidence < 0.5) continue;
            weighted_scale = ((weighted_scale*accumulated_weight) + (confidence*scale)) / (confidence + accumulated_weight);
            accumulated_weight += confidence;
        }
    }
    // scale the move skeleton by the ratio of the reference to move
    let moveScaled = [];
    for(let i in move) {
        moveScaled.push([move[i][0], [move[i][1][0] * weighted_scale,move[i][1][1] * weighted_scale,move[i][1][2]], move[i][2]]);
    }
    return moveScaled;
}

function correctSkeletons(skeleton_to_change, reference_skeleton) {
    const scaled_skeleton_to_change = scaleSkeletons(skeleton_to_change, reference_skeleton);
    console.log(scaled_skeleton_to_change);
    const aligned_scaled_skeleton_to_change = alignSkeletons(scaled_skeleton_to_change, reference_skeleton);

    // const aligned_scaled_skeleton_to_change = alignSkeletons(skeleton_to_change, reference_skeleton);
    return aligned_scaled_skeleton_to_change;
}

export { correctSkeletons };
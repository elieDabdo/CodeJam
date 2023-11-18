
confidence_threshold = 0.5;

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

function getVectors(p1,middle, p2) {
    return [p1[0] - middle[0], p1[1] - middle[1], p2[0] - middle[0], p2[1] - middle[1]];
}

function sortLandmarks(landmarks,index) {
    // sort lowest to highest
    return landmarks.sort(function(a,b) {
        return a[index] - b[index];
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
    moveAlignedX, referenceAlignedX = alignSkeletonX(move, reference);
    moveAlignedXY, referenceAlignedXY = alignSkeletonY(move, reference);
}

function isConfidentInBoth(move, reference, key) {
    return getConfidence(move,key) > confidence_threshold && getConfidence(reference,key) > confidence_threshold;
}

function shiftCoordinates(point,offset) {
    newPoint = [];
    for(let i in point) {
        newPoint.push(point[i] + offset[i]);
    }
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
    else if(isConfidentInBoth(move,reference,"nose")) {
        middleMove = getMiddlePointX(move,"nose");
        middleReference = getMiddlePointX(reference,"nose");
    }
    else{
        //throw exception???
    }

    offset = [middleReference - middleMove,0,0];
    //shift every landmark in move by the difference
    let moveAlignedX = [];
    for(let landmark in move) {
        moveAlignedX.push([landmark[0],shiftCoordinates(landmark[1],offset),landmark[2]]);
    }
    return moveAlignedX, reference;

}

function getLowestPointNotHands(landmarks) {
    for(let landmark in landmarks) {
        if(landmark[0] !== "left_hand" && landmark[0] !== "right_hand") {
            return landmark[1];
        }
    }
    return lowestPoint;
}

function alignSkeletonY(move, reference) {
    // sort both skeletons
    let moveSorted = sortLandmarks(move,1);
    let referenceSorted = sortLandmarks(reference,1);
    // find the lowest point excluding the hands

    // gotta make this not get the hands
    let lowestMoveCoordinates = getLowestPointNotHands(move);
    let lowestReferenceCoordinates = getLowestPointNotHands(reference);
    
    let offset = [0,lowestReferenceCoordinates[1] - lowestMoveCoordinates[1],0];

    let moveAlignedY = [];
    for(let landmark in move) {
        moveAlignedY.push([landmark[0],shiftCoordinates(landmark[1],offset),landmark[2]]);
    }
    return moveAlignedY, reference;

    // shift every landmark in move by the difference
}
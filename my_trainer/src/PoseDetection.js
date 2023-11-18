
const displaySkeletonOnVideo = (videoRef, skeletonInfo) => {
    //display the skeleton as an overlay on the corresponding VideoPlayer
}

const onWebcamPose = (detection) => {
    console.log(detection)
}

const onTrainingPose = (detection) => {
    console.log(detection)
}

export {displaySkeletonOnVideo, onWebcamPose, onTrainingPose};
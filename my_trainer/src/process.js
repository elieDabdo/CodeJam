landmarks = {}

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


function getMiddlePoint(p1, p2) {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

function getVectors(p1,middle, p2) {
    return [p1[0] - middle[0], p1[1] - middle[1], p2[0] - middle[0], p2[1] - middle[1]];
}
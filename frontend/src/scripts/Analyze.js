
// import * as tf from '@tensorflow/tfjs';
// import * as tmPose from '@teachablemachine/pose';

const tf = require('@tensorflow/tfjs');
const tmPose = require('@teachablemachine/pose');
global.fetch = require("node-fetch");
const { Image, createCanvas } = require('canvas');
var poses = [];
var times = [];
var time = 0;
var i = 0;
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/o-TZh3sFa/";
    let model, webcam, ctx, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);

        tmPose.load(modelURL, metadataURL).then(mod => {
            model = mod;
            maxPredictions = model.getTotalClasses();

        }).catch(err => console.log(err));
       
        // Convenience function to setup a webcam
        // const size = 200;
        // const flip = true; // whether to flip the webcam
        // webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        // await webcam.setup(); // request access to the webcam
        // await webcam.play();
       // window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        // const canvas = document.getElementById("canvas");
        // canvas.width = size; canvas.height = size;
        // ctx = canvas.getContext("2d");
        // labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < maxPredictions; i++) { // and class labels
        //     labelContainer.appendChild(document.createElement("div"));
        // }
    }

    async function loop(timestamp) {
        if(time ==0){
        start = Date.now();
        }
        //webcam.update(); // update the webcam frame
        var temp = (await predict());
if(temp!=poses[i-1]){
        poses.push(temp);
        times.push(time-Date.now());
        i++;
    }
    if(done){
    var jsonString = "{pos:"+poses+",time:"+times+"}";
    }else{ 
    window.requestAnimationFrame(loop);
    
    }
}

    async function predict(video) {
        // Prediction #1: run input through posenet
        const { pose, posenetOutput } = await model.estimatePose(video);
        // // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className;
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        console.log(classPrediction);
        return classPrediction;
        // finally draw the poses
        //drawPose(pose);
    }

//    module.exports = function drawPose(pose) {
//         if (webcam.canvas) {
//             ctx.drawImage(webcam.canvas, 0, 0);
//             // draw the keypoints and skeleton
//             if (pose) {
//                 const minPartConfidence = 0.5;
//                 tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
//                 tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
//             }
//         }
//     }



async function main() {
    await init();
    predict();
}

main();
import React, { useState, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom';
import axios from "axios";

import Button from "@material-ui/core/Button"

const constraints = {
    audio: false,
    video: {
        facingMode: "user"
    }
};

let recordedChunks = [];
let mediaRecorder;

function RecordComponent(props) {
    

    const [isRecording, setIsRecording] = useState(false);
    const [videoStream, setVideoStream] = useState();

    const sendFileToBackend = (fileBlob) => {
        let file = new File([fileBlob], "inputVideo.webm", {
            type: "video/webm"
        });
        console.log(file);

        let formData = new FormData();
        formData.append('file', file);

        axios
        .post("placeholderURl", formData)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    function handleDataAvailable(event) {
        console.log(event);
        console.log("a");

        if(event.data.size > 0) {
            recordedChunks.push(event.data);
            download();
        }
    }

    const download = () => {
        var blob = new Blob(recordedChunks);

        var url = URL.createObjectURL(blob);
        
        console.log(url);

        let link = document.getElementById('dload');

        link.href = url;
        link.download = "test.webm";

        sendFileToBackend(blob);

        
    }


    const handleClick = () => {

        let facingMode = "user";
        let constraints = {
            audio: false,
            video: {
                facingMode: facingMode
            }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            console.log(stream);
            setIsRecording(true);
            setVideoStream(stream);
            

            let video = document.getElementById('vid');
            video.srcObject = stream;

        })
    }

    useEffect(() => {

        if(isRecording) {
            let options = {
                mimeType: 'video/webm',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000
            };

            let options2 = {
                mimeType: 'video/mp4; codecs="avc1.424028, mp4a.40.2"'
            }
            mediaRecorder = new MediaRecorder(videoStream, options);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.start();

            console.log(mediaRecorder);

        }

    }, [videoStream]);
 
    const handleStopRecording = (e) => {
        e.preventDefault();
        mediaRecorder.stop();
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Click to Record!
            </Button>

            {
                isRecording ? (
                    <video id="vid" autoPlay>
                        
                    </video>
                ) : ("")
            }

            <Button onClick={handleStopRecording}>
                Click to stop recording!
            </Button>

            <a id="dload">Download!</a>
            
        </div>
       
    )

}

export default RecordComponent;
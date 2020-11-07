import React, { useState, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom';

import Button from "@material-ui/core/Button"

const constraints = {
    audio: false,
    video: {
        facingMode: "user"
    }
};

//import VideoRecorder from 'react-video-recorder'

function RecordComponent(props) {

    let mediaRecorder;

    const videoRef = useRef();

    const [isRecording, setIsRecording] = useState(true);

    const [videoStream, setVideoStream] = useState();


    const handleClick = () => {

        

        console.log('a')

        

        let facingMode = "user";
        let constraints = {
            audio: false,
            video: {
                facingMode: facingMode
            }
        };

        

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            setIsRecording(true);
            setVideoStream(stream);

            let video = document.getElementById('vid');
            video.srcObject = stream;

        })
    }

    useEffect(() => {

        mediaRecorder = new mediaRecorder(videoStream, { mimeType: "video/mp4" });
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();

    }, [videoStream]);

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
            
        </div>
       
    )

}

// function RecordComponent(props) {
//     return (
//         <div>
//         {
//             navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                
//                 (
//                     <video autoplay >
//                         <source src={stream} type="video/mp4" />
//                     </video>
//                 )
//             })
//         }
//         </div>
//     )
// }

export default RecordComponent;
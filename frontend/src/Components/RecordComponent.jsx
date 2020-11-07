import React, { useState, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom';

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
        link.download = "test.mkv";
        
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
                mimeType: 'video/mp4',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000
            };
            mediaRecorder = new MediaRecorder(videoStream);
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
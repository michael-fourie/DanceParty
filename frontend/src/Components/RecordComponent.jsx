import React, { useState, useEffect } from 'react'

import { Button } from "@blueprintjs/core";

import VideoRecorder from 'react-video-recorder'

function RecordComponent(props) {


    const handleClick = () => {

    }

    return (
        <div>
            <Button className={"docs-wiggle"} icon="video">
                Click to Record!
            </Button>
            <VideoRecorder onRecordingComplete={(videoBlob) => {
                console.log(videoBlob);
            }} />
        </div>
       
    )

}

export default RecordComponent;
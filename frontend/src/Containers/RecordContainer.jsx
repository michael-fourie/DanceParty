import React, { useState, useRef } from 'react'

import { Card, Elevation, Eleveation } from "@blueprintjs/core"
import Button from "@material-ui/core/Button"

import RecordComponent from "../Components/RecordComponent";

function RecordContainer(props) {

    

    const [isRecording, setIsRecording] = useState(false);

    const handleClick = () => {
        setIsRecording(true);
    }

    return (
        <div className="bp3-card">
        <Card interactive={true} elevation={Elevation.TWO}>
            <h5>Click to record your dance!</h5>

            <RecordComponent />

        </Card>
        </div>
    )
}

export default RecordContainer;
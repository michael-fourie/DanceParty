import React from 'react'

import { Button, Card, Elevation, Eleveation } from "@blueprintjs/core"

import RecordComponent from "../Components/RecordComponent";

function RecordContainer(props) {

    return (
        <div class="bp3-card">
        <Card interactive={true} elevation={Elevation.TWO}>
            <h5>Click to record your dance!</h5>

            <RecordComponent />

        </Card>
        </div>
    )
}

export default RecordContainer;
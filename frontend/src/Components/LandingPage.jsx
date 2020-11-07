import React, { useState, useEffect } from 'react';

import { Alignment, Navbar } from "@blueprintjs/core";

function LandingPage(props) {


    return (
        <Navbar fixedToTop={true} className="bp3-navbar bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>DanceParty</Navbar.Heading>

            </Navbar.Group>
        </Navbar>
    )
}

export default LandingPage;
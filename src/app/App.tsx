import React from 'react';
import Button from 'react-bootstrap/Button'
import './App.css';
import NintendoSwitch from '../devices/NintendoSwitch';
import Payload from '../payloads/Payload';

/**
 * TODO: Document
 */
function App() {
  return (
    <div className="App">
      <header>
        <p>
          Press the button below to launch Hekate.
        </p>
        <Button onClick={launchPayload} variant="outline-primary">Launch Payload</Button>
      </header>
    </div>
  );
}

/**
 * TODO: Document
 */
async function launchPayload() {
  // Request the device from the user.
  let device = await NintendoSwitch.requestDevice();

  // Fetch the Hekate binary.
  const hekate = await fetch("/static/payloads/hekate_ctcaer_5.2.1.bin");
  
  // Prepare the payload.
  const payload = await Payload.preparePayload(await hekate.blob());

  // Send the payload to the device.
  device.launch(payload);
}

export default App;

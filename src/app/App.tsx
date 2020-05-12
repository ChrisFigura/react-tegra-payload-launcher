import React from 'react';
import './App.css';
import NintendoSwitch from '../devices/NintendoSwitch';
import Payload from '../payloads/Payload';

// A custom bootloader for the Nintendo Switch.
declare const CTCaer_Hekate: Uint8Array;

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
        <button onClick={launchPayload}>Launch Payload</button>
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
  
  // Prepare the payload.
  let payload = Payload.preparePayload(CTCaer_Hekate);

  // Send the payload to the device.
  device.launch(payload);
}

export default App;

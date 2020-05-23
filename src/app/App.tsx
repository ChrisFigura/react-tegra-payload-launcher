import './App.css';
import React, { ChangeEvent } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import NintendoSwitch from '../devices/NintendoSwitch';
import Payload from '../payloads/Payload';

/**
 * TODO: Document
 */
let payload: Payload;

/**
 * TODO: Document
 */
function App() {
  // Create functions for manipulating and retrieving the data on the app.
  const payloadUploader = React.useRef<HTMLInputElement>(null);
  const [launchButtonDisabled, disableLaunchButton] = React.useState(true);
  const [dropdownTitle, setDropdownTitle] = React.useState("Select a payload");

  // Return the app.
  return (
    <div className="App">
      <header>
        <input
          ref={payloadUploader}
          type="file"
          accept="*/*"
          onChange={uploadPayload}
          style={{
            display: "none"
          }}
        />

        <p>CVE-2018-6242 Payload Launcher</p>

        <DropdownButton id="payloadSelector" title={dropdownTitle} variant="secondary" className="PayloadOptions">
          <Dropdown.Item onClick={prepareHekate}>Hekate v5.2.1</Dropdown.Item>
          <Dropdown.Item onClick={prepareOldHekate}>Hekate v5.0.1</Dropdown.Item>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item onClick={() => payloadUploader.current!.click()}>Upload Payload</Dropdown.Item>
        </DropdownButton>

        <Button onClick={launchPayload} className="PayloadOptions" variant="primary" disabled={launchButtonDisabled}>Launch Payload</Button>
      </header>
    </div>
  );

  /**
   * TODO: Document
   */
  async function prepareHekate() {
    // Fetch the Hekate binary.
    const hekate = await fetch("/static/payloads/hekate_ctcaer_5.2.1.bin");
    
    // Prepare the payload.
    payload = await Payload.preparePayload(await hekate.blob());

    // Enable the launch button.
    disableLaunchButton(false);

    // Set the dropdown title.
    setDropdownTitle("Hekate v5.2.1");
  }
  
  /**
   * TODO: Document
   */
  async function prepareOldHekate() {
    // Fetch the old Hekate binary.
    const hekate = await fetch("/static/payloads/hekate_ctcaer_5.0.1.bin");
  
    // Prepare the payload.
    payload = await Payload.preparePayload(await hekate.blob());
  
    // Enable the launch button.
    disableLaunchButton(false);

    // Set the dropdown title.
    setDropdownTitle("Hekate v5.0.1");
  }
  
  /**
   * TODO: Document
   * 
   * @param e The event that triggered this function. Contains the uploaded payload.
   */
  async function uploadPayload(e: ChangeEvent<HTMLInputElement>) {
    // Get the uploaded payload.
    const uploadedFile = e.target.files![0];
  
    // Make sure it's not null.
    if (uploadedFile === null) {
      return;
    }
  
    // Prepare the payload.
    payload = await Payload.preparePayload(uploadedFile);
  
    // Enable the launch button.
    disableLaunchButton(false);

    // Set the dropdown title.
    setDropdownTitle(uploadedFile.name);
  }

  /**
   * TODO: Document
   * 
   * @param payload The payload to be launched.
   */
  async function launchPayload() {
    // Request the device from the user.
    let device = await NintendoSwitch.requestDevice();
  
    // Send the payload to the device.
    device.launch(payload);
  }
}



export default App;

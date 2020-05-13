import TegraDevice from './TegraDevice';

/**
 * The Vendor ID for a Nintendo Switch.
 */
const VENDOR_ID = 0x0955;

/**
 * Represents a Nintendo Switch vulnerable to CVE-2018-6242.
 */
class NintendoSwitch extends TegraDevice {
  /**
   * Factory method for creating a new NintendoSwitch.
   */
  public static async requestDevice(): Promise<NintendoSwitch> {
    return super.requestDevice(VENDOR_ID);
  }
}

export default NintendoSwitch;

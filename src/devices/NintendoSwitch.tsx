import TegraDevice from './TegraDevice';

/**
 * Represents a Nintendo Switch vulnerable to CVE-2018-6242.
 */
class NintendoSwitch extends TegraDevice {
  /**
   * The Vendor ID for a Nintendo Switch.
   */
  private static readonly VENDOR_ID = 0x0955;

  /**
   * Factory method for creating a new NintendoSwitch.
   */
  public static async requestDevice(): Promise<NintendoSwitch> {
    return super.requestDevice(NintendoSwitch.VENDOR_ID);
  }
}

export default NintendoSwitch;

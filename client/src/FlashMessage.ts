/**
 * A handler for flash messages from the server.
 *
 * @class FlashMessage
 */
export class FlashMessage {

  // TODO: Create bootstrap alert, absolute position somewhere.
  // TODO: Remove alert X number of seconds after displayed.

  public displayMessage(message: string) {
    console.log(`FLASH: ${message}`)
  }
}

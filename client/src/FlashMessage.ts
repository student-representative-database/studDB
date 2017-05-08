/**
 * A handler for flash messages from the server.
 *
 * @class FlashMessage
 */
class FlashMessage {

  public displayMessage(message: string, type: string) {
    let validType = false

    switch (type) {
      case 'success': // Green
        validType = true
        break
      case 'info':    // Blue
        validType = true
        break
      case 'warning': // Orange
        validType = true
        break
      case 'danger':  // Red
        validType = true
        break
      default:
        break
    }

    if (validType) {
      const target = document.getElementById('home')
      const alert = document.createElement('div')
      alert.classList.add('alert', 'alert-' + type)

      function keepAtTop() {
        alert.style.top = document.body.scrollTop + 20 + 'px'
      }

      alert.style.top = document.body.scrollTop + 20 + 'px'
      document.body.addEventListener('mousewheel', keepAtTop)
      alert.textContent = message

      document.body.appendChild(alert)
      setTimeout(() => {alert.classList.add('alert-show')}, 500)

      setTimeout(() => {
        alert.classList.remove('alert-show')

        setTimeout(() => {
          document.body.removeChild(alert)
          document.body.removeEventListener('mousewheel', keepAtTop)
        }, 1000)
      }, 6000)
    } else {
      console.error('Wrong message type requested! (FlashMessage(message, type))')
    }
  }
}

export default new FlashMessage()

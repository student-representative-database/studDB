import API from './APILogic'

export class StudentPanel {

  public init() {
    console.log('StudentPanel loaded')
    const parent = document.getElementById('studentPanel')

    if (parent) {
      parent.addEventListener('click', this.eventHandler)
    }
  }

  private eventHandler(event) {
    event.preventDefault()
    if (event.target.type === 'submit') {
      if (event.target.classList.contains('glyphicon-remove-sign')) {
        event.target.classList.toggle('icon-red')
        event.target.nextElementSibling.classList.toggle('icon-green')
      }

      if (event.target.classList.contains('glyphicon-ok-sign')) {
        event.target.classList.toggle('icon-green')
        event.target.previousElementSibling.classList.toggle('icon-red')
      }
    }
  }
}

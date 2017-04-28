export class RegistryList {
  public element: HTMLElement

  constructor() {
    this.init()
  }

  private init() {
    this.element = document.createElement('div')
    this.element.classList.add('list-group')
    this.element.appendChild(this.topLevelItem())

    this.element.addEventListener('click', (event) => {
      this.eventHandler(event)
    })

    const parent = document.getElementById('main')
    parent.insertBefore(this.element, parent.firstChild)
  }

  private topLevelItem() {
    const item = document.createElement('a')
    item.classList.add('list-group-item')
    const icon = document.createElement('span')
    icon.classList.add('glyphicon', 'glyphicon-triangle-right')
    icon.setAttribute('aria-hidden', 'true')

    item.appendChild(icon)
    item.appendChild(document.createTextNode("Bläddra i registret"))

    return item
  }

  private eventHandler(event) {
    if (event.target.classList.contains('glyphicon')) {
      event.target.classList.toggle('glyphicon-triangle-right')
      event.target.classList.toggle('glyphicon-triangle-bottom')
    }
  }
}

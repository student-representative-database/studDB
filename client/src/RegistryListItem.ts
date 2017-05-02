interface IListItem {
  title: string,
  icon: boolean
}

export class RegistryListItem {
  public icon: HTMLElement = null
  public element: HTMLElement
  private options: IListItem

  constructor(options: IListItem) {
    this.options = options
    this.init()
  }

  private init() {
    const item = document.createElement('a')
    item.classList.add('list-group-item')

    item.appendChild(document.createTextNode(this.options.title))
    item.addEventListener('click', (event) => {
      this.eventHandler(event)
    })

    this.element = item

    if (this.options.icon) {
      this.createIcon()
    }
  }

  private createIcon() {
    this.icon = document.createElement('span')
    this.icon.classList.add('glyphicon', 'glyphicon-triangle-right')
    this.icon.setAttribute('aria-hidden', 'true')

    this.element.insertBefore(this.icon, this.element.firstChild)
  }

  private eventHandler(event) {
    if (this.icon) {
      this.icon.classList.toggle('glyphicon-triangle-right')
      this.icon.classList.toggle('glyphicon-triangle-bottom')
    }
  }
}

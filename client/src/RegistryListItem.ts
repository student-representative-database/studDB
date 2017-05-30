import API from './APILogic'

interface IListItem {
  id: number,
  name: string,
  icon: boolean,
  indent: number,
  type: string,
  callback: () => void
}

export class RegistryListItem {
  public icon: HTMLElement = null
  public element: HTMLElement
  private options: IListItem
  private isOpen: boolean

  constructor(options: IListItem) {
    this.options = options
    this.init()
  }

  private init() {
    const item = document.createElement('a')

    if (this.options.type === 'councils') {
      item.setAttribute('href', `/council/${this.options.id}`)
    }

    item.classList.add('list-group-item')
    item.setAttribute('data-type', this.options.type)
    let dataID = ''
    try {
      dataID = this.options.id.toString()
    } catch (e) {
      dataID = 'null'
    }
    item.setAttribute('data-id', dataID)

    if (this.options.indent === 1) {
      item.classList.add('indent')
    } else if (this.options.indent === 2) {
      item.classList.add('indent-2x')
    }

    item.appendChild(document.createTextNode(this.options.name))
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

  private getCouncils() {

    if (this.isOpen) {
      API.getAllCouncils(this.options.id)
      .then((data) => {
        data['payload'].councils.forEach((element) => {
          if (this.element.nextElementSibling) {
            this.element.parentElement.removeChild(this.element.nextElementSibling)
          }
        });
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      // Save number of councils to this object instead,
      // possible bug if someone adds a council between
      // open and closing a faculty list.
      API.getAllCouncils(this.options.id)
      .then((data) => {
        data['payload'].councils.forEach((element) => {
          const item = new RegistryListItem({
            id: element.councilInstanceId,
            name: element.name,
            icon: false,
            indent: 2,
            type: 'councils',
            callback: null
          })

          if (element.from) {
            this.element.parentElement.insertBefore(item.element, this.element.nextElementSibling)
          }
        });
      })
      .catch((err) => {
        console.log(err)
      })
    }

    this.isOpen = !this.isOpen
  }

  private eventHandler(event) {
    if (this.icon) {
      this.icon.classList.toggle('glyphicon-triangle-right')
      this.icon.classList.toggle('glyphicon-triangle-bottom')
    }

    if (this.options.type === 'councils') {
      console.log('Going to council.')
    } else {
      if (this.options.callback) {
      this.options.callback()
    } else {
      this.getCouncils()
    }
    }
  }
}

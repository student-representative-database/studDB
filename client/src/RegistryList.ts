import { RegistryListItem } from './RegistryListItem'

export class RegistryList {
  public element: HTMLElement

  constructor() {
    this.init()
  }

  public appendListTo(target: HTMLElement) {
    target.insertBefore(this.element, target.firstChild)
  }

  private init() {
    this.element = document.createElement('div')
    this.element.classList.add('list-group')

    const topLevel = new RegistryListItem({
      title: 'Bläddra i registret',
      icon: true
    })

    this.element.appendChild(topLevel.element)
  }
}

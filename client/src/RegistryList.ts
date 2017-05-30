import { RegistryListItem } from './RegistryListItem'
import API from './APILogic'

export class RegistryList {
  public element: HTMLElement
  private isOpen: boolean = false
  private parentElement: HTMLElement

  constructor() {
    this.init()
  }

  public appendListTo() {
    this.parentElement = document.getElementById('home')

    //this.parentElement.insertBefore(this.element, this.parentElement.firstChild)
    this.parentElement.insertBefore(this.element, this.parentElement.children[1])

  }

  private init = () => {
    this.element = null
    this.element = document.createElement('div')
    this.element.classList.add('list-group')
    this.element.id = 'browseList'

    const topLevel = new RegistryListItem({
      id: null,
      name: 'Bläddra i registret',
      icon: true,
      indent: null,
      type: 'top',
      callback: this.getFaculties
    })

    this.element.appendChild(topLevel.element)
  }

  private getFaculties = () => {
    if (this.isOpen) {
      // this.parentElement.removeChild(this.parentElement.firstElementChild)
      this.parentElement.removeChild(this.parentElement.children[1])
      this.init()
      this.appendListTo()
      this.isOpen = false
    } else {
      this.isOpen = true

      API.getAllFaculties()
      .then((data) => {
        const parent = document.getElementById('browseList')
        data['payload'].forEach((element) => {
          const item = new RegistryListItem({
            id: element.id,
            name: element.name,
            icon: true,
            indent: 1,
            type: 'faculties',
            callback: null
          })

          parent.appendChild(item.element)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}

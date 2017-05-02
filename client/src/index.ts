import { RegistryList } from './RegistryList'

const mainElement = document.getElementById('main')

const type = mainElement.firstElementChild.id

switch (type) {
  case 'home':
    const target = document.getElementById(type)
    const list = new RegistryList()
    list.appendListTo(target)
    break
  case 'apply-interest':
    break
  case 'administrate':
    break
  default:
    break
}

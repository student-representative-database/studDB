import { RegistryList } from './RegistryList'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { AdminPanel } from './AdminPanel'

//////

import API from './APILogic'

// API.createFaculty('Fakulteten för other stuff')
// API.deleteFaculty(5)
// API.updateFaculty(4, 'Fakulteten för hästar')

// API.getAllFaculties()
// .then((data) => {
//   console.log(data['payload'])
// })

// API.getOneFaculty(2)
// .then((data) => {
//   console.log(data['payload'])
// })

//////

const mainElement = document.getElementById('main')

const type = mainElement.firstElementChild.id

switch (type) {
  case 'home':
    const target = document.getElementById(type)
    const list = new RegistryList()
    list.appendListTo()
    break
  case 'registerform':
    const register = new RegisterForm()
    register.displayForm()
    break
  case 'admin':
    const admin = new AdminPanel()
    admin.displayPanel()
    break
  case 'login':
    const login = new LoginForm()
    login.displayForm()
    break
  default:
    break
}

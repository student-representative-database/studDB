import { RegistryList } from './RegistryList'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { CouncilPanel } from './CouncilPanel'
import { FacultyPanel } from './FacultyPanel'

// Get the id of the page.
const mainElement = document.getElementById('main')
const type = mainElement.firstElementChild.id

// Load module according to page id.
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
  case 'councilPanel':
    const council = new CouncilPanel()
    council.init()
    break
  case 'facultyPanel':
    const faculty = new FacultyPanel()
    faculty.init()
    break
  case 'login':
    const login = new LoginForm()
    login.displayForm()
    break
  default:
    break
}

// Highlight current pages navigation button
const path = window.location.pathname
console.log(path)
let li: any
switch (path) {
  case '/':
    // Home
    li = document.getElementById('navHome')
    li.classList.add('active')
    break
  case '/faq':
    // Home
    li = document.getElementById('navFaq')
    li.classList.add('active')
    break
  case '/posts':
    // Home
    li = document.getElementById('navPosts')
    li.classList.add('active')
    break
  case '/apply':
    // Home
    li = document.getElementById('navApply')
    li.classList.add('active')
    break
  case '/admin/login':
    // Home
    li = document.getElementById('navAdminLogin')
    li.classList.add('active')
    break
  default:
    break
}

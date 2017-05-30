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
const parts = window.location.pathname.split('/')

let path = '/' + parts[1]
if (parts[2]) {
  path += '/' + parts[2]
}

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
  case '/registry':
    // Home
    li = document.getElementById('navRegistry')
    li.classList.add('active')
    break
  case '/admin/login':
    // Home
    li = document.getElementById('navAdminLogin')
    li.classList.add('active')
    break
  case '/admin/faculties':
    // Home
    li = document.getElementById('navAdminFaculties')
    li.classList.add('active')
    break
  case '/admin/councils':
    // Home
    li = document.getElementById('navAdminCouncils')
    li.classList.add('active')
    break
  case '/admin/students':
    // Home
    li = document.getElementById('navAdminStudents')
    li.classList.add('active')
    break
  default:
    break
}

import alert from './FlashMessage'
import API from './APILogic'

export class RegisterForm {

  public displayForm() {
    const submit = document.getElementById('btnSubmit')
    const facultyList = document.getElementById('inputFaculty')
    if (facultyList) {
      facultyList.addEventListener('change', this.updateCouncilList)
    }
    submit.addEventListener('click', this.eventHandler.bind(this))
  }

  private updateCouncilList(event) {
    const councilList = document.getElementById('inputCouncil')
    councilList.innerHTML = `<option value="null">Välj</option>`
    if (event.target.value !== 'null') {
      API.getAllCouncils(event.target.value)
      .then((data) => {
        console.log(data['payload'])
        let html = `<option value="null">Välj</option>`
        data['payload'].councils.forEach((element) => {
          if (element.from) {
            html += `<option value="${element.id}">${element.name}</option>`
          }
        })

        councilList.innerHTML = html
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  private validateForm() {
    try {
      const formData = {
        firstName: this.getInputData('inputFirstName'),
        lastName: this.getInputData('inputLastName'),
        birthDate: this.getInputData('inputBirthDate'),
        phone: this.getInputData('inputPhone'),
        email: this.getInputData('inputEmail'),
        graduationYear: this.getInputData('inputGraduationYear'),
        phd: this.getInputData('inputPhd'),
        program: this.getInputData('inputProgram'),
        facultyId: this.getInputData('inputFaculty'),
        councilId: this.getInputData('inputCouncil'),
        comments: this.getInputData('inputComments'),
        password: this.getInputData('inputPassword')
      }

      const button = document.getElementById('btnSubmit') as HTMLInputElement
      button.disabled = true

      fetch('/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(formData),
          headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        alert.displayMessage('Anmälan skickad. Du skickas snart vidare...', 'success')
        setTimeout(() => {
          window.location.replace('/')
        }, 5000)
      })
    } catch (e) {
      alert.displayMessage(e.message, 'danger')
    }
  }

  private getInputData(id: string) {
    const input = document.getElementById(id) as HTMLInputElement

    let inputData = null

    if (input.type === 'checkbox') {
      inputData = input.checked
    } else if (input.type === 'select-one' && input.value === 'null') {
      inputData = null
    } else {
      inputData = input.value.trim()
    }

    if (typeof inputData === 'string' && inputData === '') {
      throw new Error('Fyll i alla fält med stjärna...')
    }

    if (input.type === 'password') {
      const confirm = document.getElementById('inputPasswordConfirm') as HTMLInputElement
      if (input.value !== confirm.value) {
        throw new Error('Lösenorden matchar inte!')
      }
    }

    return inputData
  }

  private submitForm() {}

  private eventHandler(event) {
    event.preventDefault()
    this.validateForm()
  }

}

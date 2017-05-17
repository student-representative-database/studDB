import alert from './FlashMessage'

export class RegisterForm {

  public displayForm() {
    console.log(`Create and display register form.`)
    const submit = document.getElementById('btnSubmit')
    submit.addEventListener('click', this.eventHandler.bind(this))
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

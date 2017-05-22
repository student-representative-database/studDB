import API from './APILogic'

export class AdminPanel {
  private councilList

  public init() {
    const elemFaculty = document.getElementById('inputFaculty')
    const elemCouncil = document.getElementById('inputCouncil')

    if (elemFaculty) {
      elemFaculty.addEventListener('change', this.eventFacultySelect.bind(this))
    }

    if (elemCouncil) {
      elemCouncil.addEventListener('change', this.eventCouncilSelect.bind(this))
    }
  }

  private eventFacultySelect(event) {
    if (event.target.value !== 'null') {
      API.getAllCouncils(event.target.value)
      .then((data) => {
        this.councilList = data['payload']
        this.updateCouncilsDropdown(this.councilList.councils)
        this.populateTable(null)
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      const tableBody = document.querySelector('tbody')
      tableBody.innerHTML = ''
      this.updateCouncilsDropdown(null)
    }

  }

  private eventCouncilSelect(event) {
    const name = document.querySelector(`option[value="${event.target.value}"]`).textContent
    if (event.target.value === 'null') {
      this.populateTable(null)
    } else {
      this.populateTable(event.target.value)
    }
  }

  /**
   * Pass council id to only show a certain council.
   */
  private populateTable(councilID?) {
    const tableBody = document.querySelector('tbody')

    let html = ''
    let list = []

    if (councilID) {
      list = this.councilList.councils.filter((el) => {
        return el.id === parseInt(councilID, 10)
      })
    } else {
      list = this.councilList.councils
    }

    list.forEach((council) => {
      const id = councilID || council.id

      API.getOneCouncil(council.id)
      .then((councilData) => {
        const cData = councilData['payload']

        cData.CouncilInstances.forEach((instance) => {
          console.log(instance)
          const from = instance.from.substring(0, 10)
          const till = instance.till.substring(0, 10)
          const studentReps = this.countStudentReps(instance.Users)
          const phdReps = this.countPhdReps(instance.Users)

          html += `<tr>
                    <td><a href="/admin/councils/${cData.id}">${cData.name}</a></td>
                    <td>${from}</td>
                    <td>${till}</td>
                    <td>${studentReps}/${cData.studentPositions}</td>
                    <td>${phdReps}/${cData.phdPositions}</td>
                  </tr>`
        })

      })
      .then(() => {
        tableBody.innerHTML = html
      })
    })
  }

  private countStudentReps(users) {
    const students = users.filter((user) => {
      return user.phd === false
    })

    return students.length
  }

  private countPhdReps(users) {
    const students = users.filter((user) => {
      return user.phd === true
    })

    return students.length
  }

  private updateCouncilsDropdown(councils) {
    const dropdown = document.getElementById('inputCouncil')
    dropdown.innerHTML = `<option value="null">Visa alla</option>`

    if (councils) {
      councils.forEach((council) => {
      const option = document.createElement('option')
      option.setAttribute('value', council.id)
      option.textContent = council.name
      dropdown.appendChild(option)
    })
    }
  }

}

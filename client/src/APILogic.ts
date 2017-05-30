class APILogic {
  private headers

  constructor() {
    this.headers = {}
    this.init()
  }

  // FACULTIES
  public getAllFaculties() {
    return fetch('/api/v1/faculties', this.headers.GET)
    .then((result) => {
      return result.json()
    })
  }

  public createFaculty(facultyName: string) {
    const data = JSON.stringify({name: facultyName})

    fetch('/api/v1/faculties', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  public deleteFaculty(facultyID: number) {
    fetch(`/api/v1/faculties/${facultyID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  public updateFaculty(id: number, facultyName: string) {
    const data = JSON.stringify({name: facultyName})

    fetch(`/api/v1/faculties/${id}`, {
      method: 'PATCH',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  public getOneFaculty(id: number) {
    return fetch(`/api/v1/faculties/${id}`, this.headers.GET)
    .then((result) => {
      return result.json()
    })
  }

  // COUNCILS
  public getAllCouncils(facultyID: number) {
    return fetch(`/api/v1/faculties/${facultyID}`, this.headers.GET)
    .then((result) => {
      return result.json()
    })
  }

  public getOneCouncil(councilID) {
    return fetch(`/api/v1/councils/${councilID}`, this.headers.GET)
    .then((result) => {
      return result.json()
    })
  }

  public getCouncilInstance(instanceId: number) {
    return fetch(`/api/v1/councilsinst/${instanceId}`, this.headers.GET)
        .then((result) => {
          return result
        })
  }

  public createUserPosition(data: any) {
    const bodyData = JSON.stringify(data)
    return fetch('/api/v1/userPosition', {
      method: 'POST',
      body: bodyData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public createCouncil() {}

  public deleteCouncil() {}

  public updateCouncil() {}

  // CRUD student/representative/employee

  // VACANT
  public getAllForSchoolYear() {
    return fetch(`/api/v1/applications/test`, this.headers.GET)
        .then((result) => {
          return result.json()
        })
  }

  // OTHER
  public sendApplicationForm() {}

  public login() {}

  public logout() {}

  public init() {
    // Setup headers.
    this.headers.GET = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

export default new APILogic()

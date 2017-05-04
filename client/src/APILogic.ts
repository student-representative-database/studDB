class APILogic {
  private headers

  constructor() {
    this.headers = {}
    this.init()
  }

  public getAllFaculties() {
    return fetch('/api/v1/faculties', this.headers.GET)
    .then((result) => {
      return result.json()
    })
  }

  public deleteFaculty() {}

  public getAllCouncils(facultyID: number) {
    return fetch(`/api/v1/faculties/${facultyID}`, this.headers.GET)
    .then((result) => {
      return result.json()
    })
  }

  public deleteCouncil() {}

  public sendApplicationForm() {}

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

import * as request from 'request-promise'

class DAO {
  private headers;
  private path;

  constructor() {
    this.headers = {};
    this.path = "http://localhost:3000";
    this.init()
  }

  // FACULTIES
  public getAllFaculties() {
    return request(`${this.path}/api/v1/faculties/`, this.headers.GET)
    .then((res) => res)
  }

  public createFaculty(facultyName: string) {
    const data = JSON.stringify({name: facultyName});

    return request(`${this.path}/api/v1/faculties`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch((err) => {
      console.log(err)
    })
  }

  public deleteFaculty(facultyID: number) {
    request(`/api/v1/faculties/${facultyID}`, {
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
    const data = JSON.stringify({name: facultyName});

    request(`/api/v1/faculties/${id}`, {
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
    return request(`${this.path}/api/v1/faculties/${id}`, this.headers.GET)
    .then((result) => {
      return result
    })
  }

  // COUNCILS
  public getAllCouncils(facultyID: number) {
    return request(`${this.path}/api/v1/councils/${facultyID}`, this.headers.GET)
    .then((result) => {
      return result
    })
  }

  public getOneCouncil(councilId: number) {
    return request(`${this.path}/api/v1/councils/${councilId}`, this.headers.GET)
        .then((result) => {
          return result
        })
  }

  public createCouncil() {}

  public deleteCouncil() {}

  public updateCouncil() {}

  // CRUD student/representative

  public getAllStudents() {
    return request(`${this.path}/api/v1/users/`, this.headers.GET)
        .then((result) => result
        )
  }

  // CRUD Employee
  public getAllStaff() {
    return request(`${this.path}/api/v1/employees/`, this.headers.GET)
        .then((result) => result
        )
  }

  // VACANT
  public getAllForSchoolYear() {
    return request(`/api/v1/applications/test`, this.headers.GET)
        .then((result) => {
          return result.json()
        })
  }

  public init() {
    // Setup headers.
    this.headers.GET = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    }
  }
}

export default new DAO()

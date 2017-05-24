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

  public deleteFaculty(facultyId: number) {
    return request(`${this.path}/api/v1/faculties/${facultyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch((err) => {
      console.log(err)
    })
  }

  public updateFaculty(facultyId: number, facultyName: string) {
    const data = JSON.stringify({name: facultyName});

    return request(`${this.path}/api/v1/faculties/${facultyId}`, {
      method: 'PATCH',
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

  public createCouncil(data: any) {
    data = JSON.stringify(data)
    return request(`${this.path}/api/v1/councils`, {
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

  public deleteCouncil(councilId: number) {
    return request(`${this.path}/api/v1/councilinst/${councilId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch((err) => {
      console.log(err)
    })
  }

  public updateCouncil() {}

  // CRUD student/representative

  public getAllStudents() {
    return request(`${this.path}/api/v1/users/`, this.headers.GET)
        .then((result) => result
        )
  }

  public getOneStudent(studentID: number) {
    return request(`${this.path}/api/v1/users/${studentID}`, this.headers.GET)
  }

  // CRUD Employee
  public getAllStaff() {
    return request(`${this.path}/api/v1/employees/`, this.headers.GET)
        .then((result) => result
        )
  }

  public getOneStaff(staffID: number) {
    return request(`${this.path}/api/v1/employees/${staffID}`, this.headers.GET)
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

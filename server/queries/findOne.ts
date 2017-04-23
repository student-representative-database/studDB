import {createCouncil} from '../model/council';
import {createEmployee} from '../model/employee';
import {createFaculty} from '../model/faculty';
import {createUser} from '../model/user';
import {CouncilModel, FacultyModel, UserModel, EmployeeModel} from '../model/model';
import {Council} from '../model/council';

export function findOneCouncil(councilId: number) {
    return CouncilModel.findById(councilId)
        .then(createCouncil);
}

export function findOneEmployee(userId: number) {
    return EmployeeModel.findById(userId)
        .then(createEmployee);
}

export function findOneFaculty(facultyId: number) {
    return FacultyModel.findById(facultyId, {
        include: [
            {
                model: CouncilModel
            }
        ]
    })
        .then(createFaculty)
}

export function findOneUser(userId: number) {
    return UserModel.findById(userId)
        .then(createUser);
}

export function findOneCouncilTest(councilId: number) {
    return CouncilModel.findById(councilId)
        .then(createCouncil);
}

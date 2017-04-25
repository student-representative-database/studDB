import {createCouncil} from '../model/council';
import {createEmployee} from '../model/employee';
import {createFaculty} from '../model/faculty';
import {createUser} from '../model/user';
import {CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel} from '../model/model';
import {ICouncil} from '../model/council';

export function findOneCouncil(councilId: number, currentYear: number) {
    return CouncilModel.findById(councilId, {
        include: [
            {
                model: CouncilInstanceModel
            }
        ]
    })
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

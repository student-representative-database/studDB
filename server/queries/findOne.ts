import {createCouncil} from '../model/council';
import {createEmployee} from '../model/employee';
import {createFaculty} from '../model/faculty';
import {createUser} from '../model/user';
import {
    CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel,
    CouncilPositionsModel, UserPositionModel
} from '../model/model';

export function findOneCouncil(councilId: number, currentYear: number) {
    return CouncilModel.findById(councilId, {
        include: [
            {
                model: CouncilInstanceModel,
                include: [
                    {
                        model: CouncilPositionsModel,
                        include: [{
                            model: UserPositionModel,
                            include: [{
                                model: UserModel
                            }]
                        }]
                    }
                ]
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

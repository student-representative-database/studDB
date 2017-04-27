import {createCouncil} from '../model/Interfaces/council';
import {createEmployee} from '../model/Interfaces/employee';
import {createFaculty} from '../model/Interfaces/faculty';
import {createUser} from '../model/Interfaces/user';
import { createCouncilInstance, createCouncilPosition } from '../model/Interfaces/councilInst';
import {
    CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel,
    CouncilPositionsModel, UserPositionModel
} from '../model/model';

export function findOneCouncil(councilId: number, currentYear: number) {
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

export function findOneInst(councilId: number, year: number) {
    return CouncilInstanceModel.findOne({
        where: { councilId, year },
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
    })
        .then(createCouncilInstance);
}

export function findOneCouncilPosition(id: number) {
    return CouncilPositionsModel.findOne({
        where: { id },
        include: [{
            model: UserPositionModel,
            include: [{
                model: UserModel
            }]
        }]
    })
        .then(createCouncilPosition);
}
import {
    EmployeeModel, FacultyModel, CouncilModel, UserModel, CouncilInstanceModel,
    UserPositionModel
} from '../model/model';
import { createEmployees } from '../model/Interfaces/employee';
import {createFaculties} from '../model/Interfaces/faculty';
import {createUsers, createUserPositions} from '../model/Interfaces/user';
import {createCouncilInstance, createCouncilInstances} from "../model/Interfaces/councilInst";

export function findAllEmployees() {
    return EmployeeModel.findAll()
        .then(createEmployees)
}

export function findAllFaculties(show: string) {
    const bool = (show === 'true');

    return FacultyModel.findAll({
        include: [
            {
                model: CouncilModel,
                include: [
                    {
                        model: CouncilInstanceModel,
                        required: bool,
                        where: {
                            from: {
                                $lt: new Date()
                            },
                            till: {
                               $gt: new Date()
                           }
                        }
                    }
                ]
            }
        ]
    })
        .then(createFaculties)
}

export function findAllUsers() {
    return UserModel.findAll()
        .then(createUsers)
}

export function findAllUserPositions() {
    return UserPositionModel.findAll()
        .then(createUserPositions)
}

export function findAllCouncilInstances() {
        return CouncilInstanceModel.findAll({
            include: [{
                model: UserModel
            }]
        })
            .then(createCouncilInstances);
}

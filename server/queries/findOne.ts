import {createCouncil} from '../model/Interfaces/council';
import {createEmployee} from '../model/Interfaces/employee';
import {createFaculty} from '../model/Interfaces/faculty';
import {createUser} from '../model/Interfaces/user';
import { createCouncilInstance} from '../model/Interfaces/councilInst';
import {
    CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel,
    UserPositionModel} from '../model/model';

export function findOneCouncil(id: number) {
    return CouncilModel.findById(id)
    /*{
        include: [
            {
                model: CouncilInstanceModel,
                /*include: [
                    {
                        model: UserModel
                    }
                ]
            }
        ]
    }) */
        .then((res) => {
            const blabla = res.get({plain: true});
            console.log(JSON.stringify(blabla, null, 2))
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

export function findOneInst(councilId: number, id: number) {
    return CouncilInstanceModel.findOne({
        where: { councilId, id },
            include: [{
                    model: UserModel
                }]
    })
        .then(createCouncilInstance);
}

/*export function findOneCouncilPosition(id: number) {
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
}*/

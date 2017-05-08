import {createCouncil} from '../model/Interfaces/council';
import {createEmployee} from '../model/Interfaces/employee';
import {createFaculty} from '../model/Interfaces/faculty';
import {createUser, createUserPosition} from '../model/Interfaces/user';
import { createCouncilInstance} from '../model/Interfaces/councilInst';
import {
    CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel,
    UserPositionModel} from '../model/model';

export function findOneCouncil(id: number, facultyId: number, all?: boolean) {
    if (all) {
        return CouncilModel.findById(id,
            {
                include: [
                    {
                        model: EmployeeModel,
                    },
                    {
                        where: {
                            from: {
                                $lt: new Date(),
                            },
                            till: {
                                $gt: new Date(),
                            }
                        },
                        model: CouncilInstanceModel,
                        include: [
                            {
                                model: UserModel
                            }
                        ]
                    }
                ]
            }) .then(createCouncil);
    }else {
        return CouncilModel.findById(id,
            {
                include: [
                    {
                        model: EmployeeModel,
                    },
                    {
                        model: CouncilInstanceModel,
                        include: [
                            {
                                model: UserModel
                            }
                        ]
                    }
                ]
            })
        /*.then((res) => {
         //const blabla = res.get({plain: true});
         const blabla = res;
         console.log(JSON.stringify(blabla, null, 2))
         createCouncil(blabla);
         })*/
            .then(createCouncil);
    }
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

export function findOneUserPosition(id: number) {
    return UserPositionModel.findById(id)
        .then(createUserPosition);
}

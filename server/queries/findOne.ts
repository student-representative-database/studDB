import {createCouncil} from '../model/Interfaces/council';
import {createEmployee, createEmployeePosition} from '../model/Interfaces/employee';
import {createFaculty} from '../model/Interfaces/faculty';
import {createUser, createUserPosition} from '../model/Interfaces/user';
import {createCouncilInstance} from '../model/Interfaces/councilInst';
import {
    CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel,
    UserPositionModel, EmployeePositionModel
} from '../model/model';

export function findOneCouncil(id: number, year?: number) {
    let from;
    let till;

    if (year < 3000 && year > 2000) { // New millenium bug :D not our problem ;)
        from = new Date(year);
        till = new Date(year);
        from.setMonth(from.getMonth() + 6);
        till.setMonth(from.getMonth() + 12);
    } else {
        from = new Date();
        till = new Date();
        if (from.getMonth() < 7) {
            from.setFullYear(from.getFullYear() - 1);
            from.setMonth(7);
            from.setDate(1);
            till.setMonth(7);
            till.setDate(7);
        }
    }

    return CouncilModel.findById(id,
        {
            include: [
                {
                    model: EmployeeModel,
                },
                {
                    model: CouncilInstanceModel,
                    required: false,
                    where: {
                                from: {
                                    $lt: till
                                },
                                till: {
                                    $gt: from
                                }
                            },
                    include: [
                        {
                            model: UserModel
                        }
                    ]
                }
            ]
        }).then(createCouncil);
}

export function findOneEmployee(userId: number) {
    return EmployeeModel.findById(userId)
        .then(createEmployee);
}

export function findOneFaculty(facultyId: number) {
    return FacultyModel.findById(facultyId, {
        include: [
            {
                model: CouncilModel,
                include: [
                    {
                        model: CouncilInstanceModel,
                        required: false,
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
        .then(createFaculty)
}

export function findOneUser(userId: number) {
    return UserModel.findById(userId)
        .then(createUser);
}

export function findOneInst(id: number) {
    return CouncilInstanceModel.findOne({
        where: {id},
        include: [{
            model: UserModel
        }]
    })
        .then(createCouncilInstance);
}

export function findOneUserPosition(UserId: number, CouncilInstanceId: number) {
    return UserPositionModel.findOne({
        where: {CouncilInstanceId, UserId}
    })
        .then(createUserPosition);
}

export function findOneEmployeePosition(EmployeeId: number, CouncilId: number) {
    return EmployeePositionModel.findOne({
        where: {CouncilId, EmployeeId},
    })
        .then(createEmployeePosition);
}

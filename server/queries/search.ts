import {
    CouncilModel, FacultyModel, UserModel, EmployeeModel, CouncilInstanceModel,
    UserPositionModel, EmployeePositionModel} from '../model/model';
import {Model} from "sequelize";

/**
 * How to use:
 * search('a').then((value) =>
 * {console.log(JSON.stringify(value));
 * return JSON.stringify(value)
 *  });
 * @param input
 * @returns {Promise<[Promise<TInstance[]>,Promise<TInstance[]>,Promise<TInstance[]>,Promise<TInstance[]>]>}
 */
export function search(input: string) {
    return Promise.all([findFaculty(input), findCouncil(input), findEmployee(input), findUser(input)]);
}

function findFaculty(input: string) {
    return FacultyModel.findAll({
        attributes: ['id', 'name'],
        where: {
            name: {
                $iLike: '%' + input + '%'
            }
        }
    })
}

function findCouncil(input: string) {
    return CouncilModel.findAll({
        where: {
            $or: [
                {
                    name: {
                        $iLike: '%' + input + '%',
                    }
                },
                {
                    description: {
                        $iLike: '%' + input + '%',
                    }
                }
            ]
        }
    })
}

function findEmployee(input: string) {
    return EmployeeModel.findAll({
        attributes: ['id', 'firstName', 'lastName', 'facultyId', 'profileUrl'],
        where: {
            $or: [
                {
                    firstName: {
                        $iLike: '%' + input + '%',
                    }
                },
                {
                    lastName: {
                        $iLike: '%' + input + '%',
                    }
                }
            ]
        }
    })
}

function findUser(input: string) {
    return UserModel.findAll({
        where: {
            $or: [
                {
                    firstName: {
                        $iLike: '%' + input + '%',
                    }
                },
                {
                    lastName: {
                        $iLike: '%' + input + '%',
                    }
                },
                {
                    program: {
                        $iLike: '%' + input + '%',
                    }
                }
            ]
        }
    })
}

import { EmployeeModel } from './../../model/model';
import {createEmployee} from '../../model/employee';

export function findOne(userId: number) {
    return EmployeeModel.findById(userId)
        .then(createEmployee);
}

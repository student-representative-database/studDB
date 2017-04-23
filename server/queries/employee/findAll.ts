import { EmployeeModel } from './../../model/model';
import { createEmployees } from '../../model/employee';

export function findAll() {
    return EmployeeModel.findAll()
        .then(createEmployees)
}

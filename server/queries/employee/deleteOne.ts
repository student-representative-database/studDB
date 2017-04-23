import {EmployeeModel} from '../../model/model';

export function deleteOne(id: number) {
    return EmployeeModel.destroy({
        where: {id}
    });
}

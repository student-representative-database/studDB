import {EmployeeModel} from '../../model/model';

export function createOne(props: any) {
    return EmployeeModel.create(props);
}

import { EmployeeModel } from './../../model/model';

export function updateOne(id: number, props: any) {

    return EmployeeModel.update(
        props,
        {
            where: {id}
        }
    );
}

import {UserModel} from '../../model/model';

export function updateUser(id: number, props: any) {

    return UserModel.update(
        props,
        {
            where: {id}
        }
    );
}

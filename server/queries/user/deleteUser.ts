import {UserModel} from '../../model/model';

export function deleteUser(id: number) {
    return UserModel.destroy({
        where: {id}
    });
}

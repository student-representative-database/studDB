import {UserModel} from '../../model/model';
import {createUsers} from '../../model/user';

export function findAllUsers() {
    return UserModel.findAll()
        .then(createUsers)
}

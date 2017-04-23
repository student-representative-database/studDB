import {UserModel} from '../../model/model';

export function createUser(props: any) {
    return UserModel.create(props);
}

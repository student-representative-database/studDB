import {UserModel} from "../../model/model";
import {createUser} from "../../model/user";


export function findOneUser(userId: number) {
    return UserModel.findById(userId)
        .then(createUser);
}

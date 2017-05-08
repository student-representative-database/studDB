import {createUser, createUserPosition, createUsers, Iuser, IUserPosition} from './user';

export interface ICouncilInst {
    readonly id: number,
    from: Date,
    till: Date,
    councilId: number,
    Users: Iuser[]
}

export function createCouncilInstance({ id, councilId, from, till, Users }: any): ICouncilInst {
    const today = new Date();
    // console.log(from.getFullYear());
    // console.log(today.getTime() < till.getTime() && today.getTime() > from.getTime());
    return {
        id,
        councilId,
        from,
        till,
        Users: createUsers(Users)
    }
}

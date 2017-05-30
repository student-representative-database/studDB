import {createUsers, Iuser} from './user';

export interface ICouncilInst {
    readonly id: number,
    from: Date,
    till: Date,
    councilId: number,
    Users: Iuser[]
}

export function createCouncilInstance({ id, councilId, from, till, Users }: any): ICouncilInst {
    return {
        id,
        councilId,
        from,
        till,
        Users: createUsers(Users)
    }
}

export function createCouncilInstances(data: any[]): ICouncilInst[] {
    return data.map(createCouncilInstance);
}

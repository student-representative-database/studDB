import {createUser, createUserPosition, Iuser, IUserPosition} from './user';

export interface ICouncilInst {
    readonly id: number,
    from: Date,
    till: Date,
    councilId: number,
    // Users: Iuser
}

export function createCouncilInstance({ id, councilId, from, till }: any): ICouncilInst {
    return {
        id,
        councilId,
        from,
        till,
        // Users: createUser(User)
    }
}

/*
export interface ICouncilPosition {
    readonly id: number,
    councilInstanceId: number,
    year: number,
    phd: boolean,
    vacant: boolean
    UserPosition: IUserPosition
}

export function createCouncilPosition({ id, councilInstanceId, year, phd, vacant, UserPosition }: any): ICouncilPosition {
    if (UserPosition) {
        return {
            id,
            councilInstanceId,
            year,
            phd,
            vacant,
            UserPosition: createUserPosition(UserPosition)
        }
    }else {
        return {
            id,
            councilInstanceId,
            year,
            phd,
            vacant,
            UserPosition: null
        }
    }
}
*/
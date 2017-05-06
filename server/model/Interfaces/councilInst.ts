//import {createUserPosition, IUserPosition} from './user';

export interface ICouncilInst {
    readonly id: number,
    councilId: number,
    from: Date,
    till: Date,
    //positions: ICouncilPosition[]
}

export function createCouncilInstance({ id, councilId, from, till, CouncilPositions }: any): ICouncilInst {
    return {
        id,
        councilId,
        from,
        till,
        //positions: CouncilPositions.map(createCouncilPosition)
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
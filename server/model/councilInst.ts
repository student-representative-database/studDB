export interface ICouncilInst {
    readonly id: number,
    councilId: number,
    year: number,
    positions: Iposition[]
}

export function createCouncilInstance({ id, councilId, year, CouncilPositions }: any): ICouncilInst {
    return {
        id,
        councilId,
        year,
        positions: CouncilPositions.map(createPosition)
    }
}

export interface Iposition {
    readonly id: number,
    councilInstanceId: number,
    year: number,
    phd: boolean,
    vacant: boolean
}

export function createPosition({ id, councilInstanceId, year, phd, vacant }: any): Iposition {
    return {
        id,
        councilInstanceId,
        year,
        phd,
        vacant,
    }
}

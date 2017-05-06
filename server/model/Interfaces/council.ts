import {createCouncilInstance, ICouncilInst} from "./councilInst";

export interface ICouncil {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
    studentPositions: number,
    phdPositions: number,
    councilInstances: ICouncilInst
}

export interface ICouncilFacultyView {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
}

export function createCouncil({ id, name, description, facultyId, studentPositions, phdPositions, CouncilInst }: any): ICouncil {
    return {
        id,
        name,
        description,
        facultyId,
        studentPositions,
        phdPositions,
        councilInstances: createCouncilInstance(CouncilInst)
    }
}

export function createCouncilFacultyView({ id, name, description, facultyId }: any): ICouncilFacultyView {
    return{
        id,
        name,
        description,
        facultyId
    }
}

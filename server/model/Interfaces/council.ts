import {createCouncilInstance, ICouncilInst} from "./councilInst";

export interface ICouncil {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
    studentPositions: number,
    phdPositions: number,
    CouncilInstances: ICouncilInst
}

export interface ICouncilFacultyView {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
}

export function createCouncil({id, name, description , facultyId, studentPositions, phdPositions, CouncilInstances}: any): ICouncil {
    return {
        id,
        name,
        description,
        facultyId,
        studentPositions,
        phdPositions,
        CouncilInstances: CouncilInstances.map(createCouncilInstance)
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

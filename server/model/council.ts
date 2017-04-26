import {ICouncilInst} from './councilInst';
import {createCouncilInstance} from './councilInst';

export interface ICouncil {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
    studentPositions: number,
    phdPositions: number,
    councilInstances: ICouncilInst[]
}

export interface ICouncilFacultyView {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
}

export function createCouncil({ id, name, description, facultyId, studentPositions, phdPositions, CouncilInstances }: any): ICouncil {
    return {
        id,
        name,
        description,
        facultyId,
        studentPositions,
        phdPositions,
        councilInstances: CouncilInstances.map(createCouncilInstance)
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

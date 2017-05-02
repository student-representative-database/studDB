export interface ICouncil {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
    studentPositions: number,
    phdPositions: number,
}

export interface ICouncilFacultyView {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
}

export function createCouncil({ id, name, description, facultyId, studentPositions, phdPositions }: any): ICouncil {
    return {
        id,
        name,
        description,
        facultyId,
        studentPositions,
        phdPositions,
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

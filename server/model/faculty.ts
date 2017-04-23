import {ICouncil} from './council'

export interface Faculty {
    readonly id: number,
    name: string,
    councils: ICouncil[]
}

export function createFaculty({id, name, Councils}: any): Faculty {
    return {
        id,
        name,
        councils: Councils.map(createCouncilFromDbModel)
    };
}

export function createFaculties(data: any[]): Faculty[] {
    return data.map(createFaculty);
}

function createCouncilFromDbModel({id, name, facultyId}: any): ICouncil {
    return {
        id,
        name,
        facultyId
    }
}

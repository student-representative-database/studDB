import {ICouncil} from './council'
import {ICouncilFacultyView} from './council'

export interface IFaculty {
    readonly id: number,
    name: string,
    councils: ICouncil[]
}

export function createFaculty({id, name, Councils}: any): IFaculty {
    return {
        id,
        name,
        councils: Councils.map(createCouncilFromDbModel)
    };
}

export function createFaculties(data: any[]): IFaculty[] {
    return data.map(createFaculty);
}

function createCouncilFromDbModel({id, name, description, facultyId}: any): ICouncilFacultyView {
    return {
        id,
        name,
        description,
        facultyId,
    }
}

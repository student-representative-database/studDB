import {ICouncil} from './council'
import {ICouncilFacultyView} from './council'
import {ICouncilInst} from './councilInst'
import {createCouncilInstance} from './councilInst'

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

function createCouncilFromDbModel({id, name, description, facultyId}: any): ICouncilFacultyView {
    return {
        id,
        name,
        description,
        facultyId,
    }
}

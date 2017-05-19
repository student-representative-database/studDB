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

function createCouncilFromDbModel({id, name, facultyId, studentPositions, phdPositions, CouncilInstances}: any): ICouncilFacultyView {
    let from;
    let till;

    if (CouncilInstances[0]) {
        from = CouncilInstances[0].from;
        till = CouncilInstances[0].till;
    }else {
        from = null;
        till = null;
    }

    return {
        id,
        name,
        studentPositions,
        phdPositions,
        from,
        till,
        facultyId,
    }
}

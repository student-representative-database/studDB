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
    let councilInstanceId;
    let councilId;

    if (CouncilInstances[0]) {
        from = CouncilInstances[0].from;
        till = CouncilInstances[0].till;
        councilInstanceId = CouncilInstances[0].id;
        councilId = CouncilInstances[0].councilId;
    }else {
        from = null;
        till = null;
        councilInstanceId = null;
        councilId = null;
    }

    return {
        id,
        name,
        studentPositions,
        phdPositions,
        from,
        till,
        councilInstanceId,
        councilId,
        facultyId,
    }
}

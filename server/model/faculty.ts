import  {Council} from "./council"

export interface Faculty {
    readonly id: number,
    name: string,
    councils: Council[]
}

export function createFaculty({id, name, Councils}: any): Faculty {
    return {
        id,
        name,
        councils: Councils.map(createCouncilFromDbModel)
    };
}

export function createFaculties(data: any[]): Faculty[] {
    console.log(data);
    return data.map(createFaculty);
}

function createCouncilFromDbModel({id, name, facultyId}: any): Council {
    return {
        id,
        name,
        facultyId
    }
}
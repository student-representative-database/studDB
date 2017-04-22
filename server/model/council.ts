export interface Council {
    readonly id:number,
    name: string;
    facultyId: number;
}

export function createCouncil({id, name, facultyId}: any): Council {
    return {
        id,
        name,
        facultyId
    }
}
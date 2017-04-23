export interface ICouncil {
    readonly id: number,
    name: string;
    facultyId: number;
}

export class Council implements ICouncil {
    public name: string;
    public facultyId: number;
    public id: number;

    constructor(name: string, facultyId: number, id: number) {
        this.name = name;
        this.facultyId = facultyId;
        this.id = id;
    }

    public output() {
        return this;
    }
}

export function createCouncil({id, name, facultyId}: any): ICouncil {
    return new Council(id, name, facultyId);
}

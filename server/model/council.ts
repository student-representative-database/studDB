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

/* export class Council implements ICouncil {
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
}*/


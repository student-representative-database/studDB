import {createCouncilInstance, ICouncilInst} from "./councilInst";
import {createEmployee, Iemployee} from "./employee";

export interface ICouncil {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
    studentPositions: number,
    phdPositions: number,
    Employees: Iemployee[],
    CouncilInstances: ICouncilInst
}

export interface ICouncilFacultyView {
    readonly id: number,
    name: string,
    description: string,
    facultyId: number,
}

export function createCouncil({id, name, description , facultyId, studentPositions, phdPositions, Employees, CouncilInstances}: any): ICouncil {
    return {
        id,
        name,
        description,
        facultyId,
        studentPositions,
        phdPositions,
        Employees: Employees.map(createEmployee),
        CouncilInstances: CouncilInstances.map(createCouncilInstance)
    }
}

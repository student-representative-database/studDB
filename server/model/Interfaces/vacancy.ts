export interface Ivacant {
    facultyName: string,
    facultyId: string,
    name: string,
    CouncilId: number,
    CouncilInstId: number,
    studentPositions: number,
    electedStuds: number,
    phdPositions: number,
    electedPhds: number
}

export function createVacancy({facultyName, facultyId, name, CouncilId, CouncilInstId, studentPositions, electedStuds, phdPositions, electedPhds}): Ivacant {
    return {
        facultyName,
        facultyId,
        name,
        CouncilId,
        CouncilInstId,
        studentPositions,
        electedStuds: parseInt(electedStuds, 0),
        phdPositions,
        electedPhds: parseInt(electedPhds, 0),
    };
}

export function createVacancies(data: any[]): Ivacant[] {
    return data.map(createVacancy);
}

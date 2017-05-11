export interface Ifaculty {
    facultyId: number,
    facultyName: string,
    councils: Icouninst[],
}

function createFaculty({id, name, Councils}: any): Ifaculty {
    return {
        facultyId: id,
        facultyName: name,
        councils: Councils.map(createCouncil)
    }
}

export function createFaculties(data: any[]): Ifaculty[] {
    return data.map(createFaculty);
}

function createCouncil({id, name, studentPositions, phdPositions, CouncilInstances}: any): Icouninst {
    console.log(JSON.stringify(CouncilInstances, null, 2));
    return {
        councilId: id,
        name,
        studentPositions,
        phdPositions,
        councilInstanceId: CouncilInstances[0].id,
        vacantPhds: (phdPositions - countPhds(CouncilInstances[0].Users)),
        vacantStudents: (studentPositions - countStudents(CouncilInstances[0].Users))
    }
}


export interface Icouninst {
    councilId: number,
    name: string,
    studentPositions: number,
    phdPositions: number,
    councilInstanceId: number,
    vacantPhds: number,
    vacantStudents: number;
}

interface Iphd {
    blabla: number;
}

function createPhdPos({phd}: any): Iphd {
    if (phd === true) {
        return {
            blabla: phd
        }
    }
}

function countPhds(users: any[]): number {
    let count = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].phd === true) {
            count++
        }
    }
    return count;
}
function countStudents(users: any[]): number {
    let count = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].phd === false) {
            count++
        }
    }
    return count;
}


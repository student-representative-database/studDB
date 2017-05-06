export interface Iemployee {
    readonly id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    facultyId: number,
    profileUrl: string,
    password: string
}

export function createEmployee({
    id,
    firstName,
    lastName,
    phone,
    email,
    facultyId,
    profileUrl,
    password}: any): Iemployee {
    return {
        id,
        firstName,
        lastName,
        phone,
        email,
        facultyId,
        profileUrl,
        password
    };
}

export function createEmployees(data: any[]): Iemployee[] {
    return data.map(createEmployee);
}

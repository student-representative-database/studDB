export interface Iuser {
    readonly id: number,
    firstName: string,
    lastName: string,
    phd: boolean,
    phone: string,
    email: string,
    faculty: string,
    graduationYear: Date
    password: string
}

export function createUser({
    id,
    firstName,
    lastName,
    phd,
    phone,
    email,
    faculty,
    graduationYear,
    password}: any): Iuser {
    return {
        id,
        firstName,
        lastName,
        phd,
        phone,
        email,
        faculty,
        graduationYear,
        password
    };
}

export function createUsers(data: any[]): Iuser[] {
    return data.map(createUser);
}

export interface Iuser {
    readonly id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    phd: boolean,
    phone: string,
    email: string,
    faculty: number,
    graduationYear: Date,
    program: string,
    comments: string
}

export function createUser({
    id,
    firstName,
    lastName,
    birthDate,
    phd,
    phone,
    email,
    faculty,
    graduationYear,
    program,
    comments}: any): Iuser {
    return {
        id,
        firstName,
        lastName,
        birthDate,
        phd,
        phone,
        email,
        faculty,
        graduationYear,
        program,
        comments
    };
}

export interface IUserPosition {
    readonly UserId: number,
    readonly CouncilInstanceId: number,
    from: Date,
    till: Date,
    elected: boolean,
    User: Iuser
}

export function createUserPosition({ UserId, CouncilInstanceId, from, till, elected, User }: any): IUserPosition {
        return {
            UserId,
            CouncilInstanceId,
            from,
            till,
            elected,
            User: createUser(User)
        };
}

export function createUsers(data: any[]): Iuser[] {
    return data.map(createUser);
}
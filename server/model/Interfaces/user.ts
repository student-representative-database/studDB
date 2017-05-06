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
    comments: string,
    UserPosition: IUserPosition
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
    comments, UserPosition}: any): Iuser {
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
        comments,
        UserPosition
    };
}

export interface IUserPosition {
    readonly UserId: number,
    readonly CouncilInstanceId: number,
    from: Date,
    till: Date,
    elected: boolean,
}

export function createUserPosition({ UserId, CouncilInstanceId, from, till, elected }: any): IUserPosition {
        return {
            UserId,
            CouncilInstanceId,
            from,
            till,
            elected
        };
}

export function createUsers(data: any[]): Iuser[] {
    return data.map(createUser);
}
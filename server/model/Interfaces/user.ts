export interface Iuser {
    readonly id: number,
    firstName: string,
    lastName: string,
    phd: boolean,
    phone: string,
    email: string,
    faculty: string,
    graduationYear: Date
}

export function createUser({
    id,
    firstName,
    lastName,
    phd,
    phone,
    email,
    faculty,
    graduationYear}: any): Iuser {
    return {
        id,
        firstName,
        lastName,
        phd,
        phone,
        email,
        faculty,
        graduationYear,
    };
}

export interface IUserPosition {
    readonly UserId: number,
    readonly CouncilPositionId: number,
    until: Date,
    User: Iuser
}

export function createUserPosition({ UserId, CouncilPositionId, until, User }: any): IUserPosition {
        return {
            UserId,
            CouncilPositionId,
            until,
            User: createUser(User)
        };
}

export function createUsers(data: any[]): Iuser[] {
    return data.map(createUser);
}
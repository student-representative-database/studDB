import  {Council} from "./council"

export interface User {
    readonly id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export function createUser({id, firstName, lastName, email, password}: any): User {
    return {
        id,
        firstName,
        lastName,
        email,
        password
    };
}

export function createUsers(data: any[]): User[] {
    console.log(data);
    return data.map(createUser);
}
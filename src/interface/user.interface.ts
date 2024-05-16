export interface IUser {
    name: string;
    email: string;
    age: number;
    gender: string;
    role: string;
    password: string;
    [key: string]: any;
}

export interface IUserDb extends IUser{
    _id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreateResponse {
    name: string;
    email: string;
    age: number;
    role: string;
    gender: string;
}

export interface IUserResponse {
    total: number;
    data: IUserDb[];
}
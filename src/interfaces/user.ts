export interface IUser {
    id: string,
    email: string,
    authToken: string,
    hash: string,
    salt: string
}
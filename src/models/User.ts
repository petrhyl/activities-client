export interface User{
    username: string,
    displayName: string,
    token: string,
    imageUrl?: string
}

export interface Login{
    email: string,
    password: string
}

export interface UserRegistration{
    email: string,
    password: string,
    displayName: string,
    userName: string
}
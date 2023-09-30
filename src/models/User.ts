export interface User{
    username: string,
    displayName: string,
    token: string,
    image?: string
}

export interface Login{
    email: string,
    password: string
}
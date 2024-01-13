export interface User {
    username: string,
    displayName: string,
    bio: string | null
    token: string,
    imageUrl: string | null
}

export interface Login {
    username: string,
    password: string
}

export interface UserRegistration {
    email: string,
    password: string,
    displayName: string,
    userName: string
}

export interface ApplicationUser {
    identification: string,
    displayName: string,
    secret: string
}

export interface Profile {
    username: string,
    displayName: string,
    email: string,
    bio: string | null,
    imageUrl: string | null
}

export interface PhotoImage {
    id: string,
    url: string,
    isMain: boolean
}

export interface AboutSection {
    username?: string
    displayName: string,
    bio: string
}
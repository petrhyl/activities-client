export interface SubmitResponse {
    isResponded: boolean,
    isSuccessful: boolean,
    message: string
}

export interface SelectOption{
    id: string,
    value: string,
    text: string, 
    isSelected: boolean
}

export interface FetchResponse {
    isSuccessful: boolean,
    errorMessage: string | null
}
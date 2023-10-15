import type HttpVerbs from "@/utils/constanses/HttpVerbs"

export interface SubmitResponse {
    isResponded: boolean,
    isSuccessful: boolean,
    message: string
}

export interface SelectOption {
    id: string,
    value: string,
    text: string,
    isSelected: boolean
}

export interface FetchResponse {
    isSuccessful: boolean,
    errorMessage: string | null
}

export interface FetchDataParams<T, U> {
    method: HttpVerbs,
    requestBody: T | null
}

export interface FetchDataResponse<T> extends FetchResponse {
    data: T | null
}

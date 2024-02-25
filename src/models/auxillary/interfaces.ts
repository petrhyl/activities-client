import type HttpVerbs from "@/utils/constanses/HttpVerbs"
import type { Ref, reactive } from "vue"

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

/**
 * @interface FetchDataParams
 * @property {HttpVerbs} method - value of an enum HttpVerbs to deside what http method will a request contain
 * @property {T | null} requestBody - value of an request's payload if any
 * @type {U} - type of an object that is expected to retrieve as a response from API
 */
export interface FetchDataParams<T, U> {
    method: HttpVerbs,
    requestBody: T | null
}

export interface FetchDataResponse<T> extends FetchResponse {
    data: T | null
}

export interface FormInputToValidate {
    value: string,
    warning: string,
    isChanged: boolean,
    isValid: boolean
}

export interface AddPhotoRequest {
    file: File,
    isMain: boolean
}

export interface ModalInState {
    id: string,
    isOpen: boolean,
    elementId: string
}

export interface ModalState {
    modalInState: ModalInState,
    setOpenModal: (id: string, identifier: string) => void,
    setCloseModal: () => void
}

export interface PagedList<T>{
    totalPages: number,
    currentPage: number,
    pageSize: number,
    totalItems: number,
    items: T[]
}

export interface PagedRequest{
    pageNumber: number,
    pageSize: number
}

export interface QueryOptions{
    queryNames: ReadonlyArray<string>
    getQueryValue(queryName: string): string | null
    /**
     * Set the query value to the query name if the given query name is inclueded in this object's property named 'queryNames'
     * @param queryName name of setting query - has to have value of the given queryNames in this object's property named 'queryNames'
     * @param value value of a query
     */
    setQuery(queryName: string, value: string): void
    deleteQueryValue(queryName: string):void
    getAllQueries(): [string, string][]
    getUrlQueryString(): string 
}
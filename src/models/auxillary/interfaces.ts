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

export interface FetchDataParams<T, U> {
    method: HttpVerbs,
    requestBody: T | null
    headers: {} | null
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
import type { FetchDataParams, FetchDataResponse } from "@/models/auxillary/interfaces";
import HttpVerbs from "./constanses/HttpVerbs";
import { DataObject } from "./constanses/enums";


/**
     * Send request to the server for POST/UPDATE/GET data according FetchDataParams.HttpMethod and obtain corresponding response
     * @param {FetchDataParams} params - an object of type <FetchDataParams> containing what http method to use and what type of response to expect
     * @param {DataObject} fetchingObject - enum indicating an object what is requested
     * @param {string} apiEndpoint - endpoint which to call API with
     * @return {Promise<FetchDataResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
export const fetchData = async <T, U>(params: FetchDataParams<T, U>, fetchingObject: DataObject, apiEndpoint: string): Promise<FetchDataResponse<U>> => {

    let parametrObject: RequestInit = {
        method: params.method
    }
    
    let headers : HeadersInit = {}

    if (params.headers) {
        headers = {
            ...params.headers
        }
    }

    if (params.method === HttpVerbs.PUT || params.method === HttpVerbs.POST) {
         headers = {
            ...headers,
            'Content-Type':'application/json'
        }
    }

    if (Object.keys(headers).length > 0) {
        parametrObject = {
            ...parametrObject,
            headers: {
                ...headers
            }
        }
    }

    if (params.requestBody) {
        parametrObject = {
            ...parametrObject,
            body: JSON.stringify(params.requestBody)
        }
    }

    try {
        const response = await fetch(apiEndpoint, parametrObject);

        if (!response.ok) {
            if (response.status >= 500) {
                const message = 'There is an error on the server side. ' + getResponseErrorMessage(params.method, fetchingObject);
                throw new Error(message);
            }

            if (response.status === 401) {
                throw new Error("Wrong login details.");
            }

            if (response.status === 400 || response.status === 422) {
                throw new Error("Sorry, your entered data could not be processed.");
            }

            if (response.status === 404) {
                throw new Error("The specific request was not found.")
            }

            throw new Error("Something went wrong.")
        }

        let data: U | null = null;

        if (response.status === 200) {
            data = await response.json();
        }

        return {
            data: data,
            isSuccessful: true,
            errorMessage: ''
        };

    } catch (err) {
        let errMsg = 'Unexpected error.'

        if (err instanceof Error) {
            errMsg = err.message;
            if (errMsg === '') {
                errMsg = getResponseErrorMessage(params.method, fetchingObject);
            }
        }

        return {
            data: null,
            isSuccessful: false,
            errorMessage: errMsg
        };
    }
}

const getResponseErrorMessage = (method: HttpVerbs, fetchingObject: DataObject) => {
    switch (fetchingObject) {
        case DataObject.ACTIVITIES:
            return 'The activities could not be loaded.';
        case DataObject.ACTIVITY:
            switch (method) {
                case HttpVerbs.GET:
                    return 'The activity could not be loaded.';
                case HttpVerbs.POST:
                    return 'The activity could not be created.';
                case HttpVerbs.DELETE:
                    return 'The activity could not be deleted.';
                case HttpVerbs.PUT:
                    return 'The activity could not be updated.';
                default:
                    return '';
            }
        case DataObject.ACTIVITY_CATEGORIES:
            return 'The activity categories could not be loaded.';
        case DataObject.ACTIVITY_CATEGORY:
            return 'The activity category could not be loaded.';
        default:
            return '';
    }
}
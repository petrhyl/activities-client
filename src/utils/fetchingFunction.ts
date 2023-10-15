import type { FetchDataParams, FetchDataResponse } from "@/models/auxillary/interfaces";
import HttpVerbs from "./constanses/HttpVerbs";
import { DataObject } from "./constanses/enums";

export const fetchData = async <T, U>(params: FetchDataParams<T, U>, fetchingObject: DataObject, apiEndpoint: string): Promise<FetchDataResponse<U>> => {
    
    let parametrObject: RequestInit = {
        method: params.method
    }

    if (params.method === HttpVerbs.PUT || params.method === HttpVerbs.POST) {
        parametrObject = {
            ...parametrObject,
            body: JSON.stringify(params.requestBody),
            headers: {
                'Content-type': 'application/json'
            }
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
                throw new Error("You have to be logged in.");                    
            }
            
            if (response.status === 400 || response.status === 422) {
                throw new Error("Sorry, your entered data could not be processed.");                    
            }

            if (response.status === 404) {
                throw new Error("The specific request was not found.")  
            }
        }        

        let data: U | null = null;

        if (params.method === HttpVerbs.GET) {
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
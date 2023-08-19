import { HttpVerbs } from "@/utils/constanses/HttpVerbs";
import type { Activity } from "@/models/Activity";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const useActivityStore = defineStore('activityStore', () => {
    
    const activities: Ref<Activity[]> = ref([]);
    const activity: Ref<Activity | null> = ref(null);
    const errorMessage: Ref<string> = ref('');

    /**
     * Create a request on the server to load list of the objects of <Activity>. The list is stored in the getter of this hook.
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null,
     *  otherwise false and reason in error message
     */
    const loadActivities = async (): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams = {
            method: HttpVerbs.GET,
            body: null,
            id: null
        };

        const isSuccessful = await fetchData(fetchParams);

        return { isSuccessful, errorMessage: !isSuccessful ? errorMessage.value : null }
    }

    /**
     * Create a request on the server to load the object of type <Activity>. The object is stored in the getter of this hook.
     * @param {string} idActivity - ID of the object of type <Activity>
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
    const loadSingleActivity = async (idActivity: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams = {
            method: HttpVerbs.GET,
            body: null,
            id: idActivity
        };
        const isSuccessful = await fetchData(fetchParams);

        return { isSuccessful, errorMessage: !isSuccessful ? errorMessage.value : null }
    }

    /**
     * Create a request on the server to update the object of type <Activity>.
     * @param {Activity} activityObject - the modified object of type <Activity> 
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
    const updateActivity = async (activityObject: Activity): Promise<FetchResponse> => {
        if (!activityObject.id) {
            return { isSuccessful: false, errorMessage: 'You have to provide ID of the modifying object.' }
        }

        const fetchParams: FetchDataParams = {
            method: HttpVerbs.PUT,
            body: activityObject,
            id: activityObject.id
        };
        
        const isSuccessful = await fetchData(fetchParams);

        return { isSuccessful, errorMessage: !isSuccessful ? errorMessage.value : null }
    }

    /**
     * Create a request on the server to create a new object of type <Activity>.
     * @param {Activity} activityObject - the object of type <Activity> 
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
    const createActivity = async (activityObject: Activity): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams = {
            method: HttpVerbs.POST,
            body: activityObject,
            id: null
        };
        const isSuccessful = await fetchData(fetchParams);

        return { isSuccessful, errorMessage: !isSuccessful ? errorMessage.value : null }
    }

    /**
    * Create a request on the server to remove the object of type <Activity>.
    * @param {String} idActivity - ID of the object of type <Activity> to be deleted 
    * @return <Promise<FetchResponse>> - if request was completed successfully return the property indicating success is true and error message null, 
    * otherwise false and reason in error message
    */
    const deleteActivity = async (idActivity: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams = {
            method: HttpVerbs.DELETE,
            body: null,
            id: idActivity
        };
        const isSuccessful = await fetchData(fetchParams);

        return { isSuccessful, errorMessage: !isSuccessful ? errorMessage.value : null }
    }

    const getActivity = computed(() => activity.value);

    const getActivities = computed(() => activities.value);


    interface FetchDataParams {
        method: HttpVerbs,
        id: string | null,
        body: Activity | null
    }

    const fetchData = async (params: FetchDataParams) => {
        let url = 'https://localhost:5000/api/activities';

        if (params.id) {
            url += `/${params.id}`;
        }

        let parametrObject: RequestInit = {
            method: params.method
        }

        if (params.method === HttpVerbs.PUT || params.method === HttpVerbs.POST) {
            parametrObject = {
                ...parametrObject,
                body: JSON.stringify(params.body),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        }

        try {
            const response = await fetch(url, parametrObject);

            if (!response.ok) {
                const message = 'There is an error on the server side. ' + getResponseErrorMessage(params.method, params.id !== null);
                throw new Error(message);
            }

            if (params.method === HttpVerbs.GET) {
                if (params.id) {
                    activity.value = await response.json();
                } else {
                    activities.value = await response.json();
                }
            }

            return true;
        } catch (err) {
            if (err instanceof Error) {
                let errMsg = err.message;
                if (errMsg === '') {
                    errMsg = getResponseErrorMessage(params.method, params.id !== null);
                }

                errorMessage.value = errMsg;

                return false;
            }

            errorMessage.value = 'Unexpected error.';

            return false;
        }
    }

    const getResponseErrorMessage = (method: HttpVerbs, isFetchingOneActivity: boolean) => {
        switch (method) {
            case HttpVerbs.GET:
                if (isFetchingOneActivity) {
                    return 'The activity could not be loaded.';
                }
                return 'The activities could not be loaded.';
            case HttpVerbs.POST:
                return 'The activity could not be created.';
            case HttpVerbs.DELETE:
                return 'The activity could not be deleted.';
            case HttpVerbs.PUT:
                return 'The activity could not be updated.';
            default:
                return '';
        }
    }



    return {
        loadActivities,
        loadSingleActivity,
        updateActivity,
        createActivity,
        deleteActivity,
        getActivity,
        getActivities
    }
});

export interface FetchResponse {
    isSuccessful: boolean,
    errorMessage: string | null
}
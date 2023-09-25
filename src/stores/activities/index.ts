import HttpVerbs from "@/utils/constanses/HttpVerbs";
import type { Activity, ActivityCategory } from "@/models/Activity";
import { defineStore } from "pinia";
import { computed, ref, type ComputedRef, type Ref } from "vue";
import type { SelectOption } from "@/models/auxillary/interfaces";

export const useActivityStore = defineStore('activityStore', () => {

    interface FetchDataParams {
        method: HttpVerbs,
        id: string | null,
        body: Activity | null
    }

    enum DataObject {
        ACTIVITY,
        ACTIVITIES,
        ACTIVITY_CATEGORIES,
        ACTIVITY_CATEGORY
    }

    const activities: Ref<Activity[]> = ref([]);
    const activity: Ref<Activity | null> = ref(null);
    const categories: Ref<ActivityCategory[]> = ref([]);
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

        const isSuccessful = await fetchData(fetchParams, DataObject.ACTIVITIES);

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

    /**
     * Create a request on the server to load list of the objects of <ActivityCategory>. The list is stored in the getter of this hook.
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null,
     *  otherwise false and reason in error message
     */
    const loadActivityCategories = async (): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams = {
            method: HttpVerbs.GET,
            body: null,
            id: null
        };

        const isSuccessful = await fetchData(fetchParams, DataObject.ACTIVITY_CATEGORIES);

        return { isSuccessful, errorMessage: !isSuccessful ? errorMessage.value : null }
    }


    const getActivity = computed(() => activity.value);

    const getActivities = computed(() => activities.value);

    const getGroupedByDateActivities = computed(() => {
        return Object.entries(
            activities.value.reduce((groupedActivities, singleActivity) => {
                const date = new Date(singleActivity.beginDate).toLocaleDateString();
                groupedActivities[date] = groupedActivities[date] ? [...groupedActivities[date], singleActivity] : [singleActivity];
                return groupedActivities;
            }, {} as { [key: string]: Activity[] })
        );
    });

    const getActivityCategories: ComputedRef<ActivityCategory[]> = computed(() => categories.value);


    const fetchData = async (params: FetchDataParams, fetchingObject: DataObject = DataObject.ACTIVITY) => {
        let url = 'https://localhost:5000/api/activities';

        if (fetchingObject === DataObject.ACTIVITY_CATEGORY || fetchingObject === DataObject.ACTIVITY_CATEGORIES) {
            url = 'https://localhost:5000/api/activity/categories';
        }

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
            }

            if (params.method === HttpVerbs.GET) {
                switch (fetchingObject) {
                    case DataObject.ACTIVITIES: activities.value = await response.json();
                        break;
                    case DataObject.ACTIVITY: activity.value = await response.json();
                        break;
                    case DataObject.ACTIVITY_CATEGORIES: categories.value = await response.json();
                        break
                    default:
                        break;
                }
            }

            return true;

        } catch (err) {
            if (err instanceof Error) {
                let errMsg = err.message;
                if (errMsg === '') {
                    errMsg = getResponseErrorMessage(params.method, fetchingObject);
                }

                errorMessage.value = errMsg;

                return false;
            }

            errorMessage.value = 'Unexpected error.';

            return false;
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


    return {
        loadActivities,
        loadSingleActivity,
        updateActivity,
        createActivity,
        deleteActivity,
        loadActivityCategories,
        getActivity,
        getActivities,
        getGroupedByDateActivities,
        getActivityCategories
    }
});

export interface FetchResponse {
    isSuccessful: boolean,
    errorMessage: string | null
}
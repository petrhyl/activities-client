import HttpVerbs from "@/utils/constanses/HttpVerbs";
import { defineStore } from "pinia";
import { computed, ref, type ComputedRef, type Ref } from "vue";
import type { FetchDataParams, FetchResponse } from "@/models/auxillary/interfaces";
import { DataObject } from "@/utils/constanses/enums";
import { fetchData } from "@/utils/fetchingFunction";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import type { Activity, ActivityCategory, ActivityRequest } from "@/models/Activity";
import { useUserStore } from "../user";

export const useActivityStore = defineStore('activityStore', () => {

    const userStore = useUserStore()

    const activities: Ref<Activity[]> = ref([]);
    const activity: Ref<Activity | null> = ref(null);
    const categories: Ref<ActivityCategory[]> = ref([]);

    /**
     * Create a request on the server to load list of the objects of <Activity>. The list is stored in the getter of this hook.
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null,
     *  otherwise false and reason in error message
     */
    const loadActivities = async (): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<Activity[], Activity[]> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: null
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITIES, ApiEndpoints.ACTIVITIES);

        if (response.isSuccessful) {
            activities.value = response.data!;
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    /**
     * Create a request on the server to load the object of type <Activity>. The object is stored in the getter of this hook.
     * @param {string} idActivity - ID of the object of type <Activity>
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
    const loadSingleActivity = async (idActivity: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<Activity, Activity> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: null
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY, ApiEndpoints.ACTIVITY + idActivity);

        if (response.isSuccessful) {
            activity.value = response.data!;
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    /**
     * Create a request on the server to update the object of type <Activity>.
     * @param {ActivityRequest} activityObject - the modified object of type <Activity> 
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
    const updateActivity = async (activityObject: ActivityRequest): Promise<FetchResponse> => {
        if (!activityObject.id) {
            return { isSuccessful: false, errorMessage: 'You have to provide ID of the updating object.' }
        }

        const fetchParams: FetchDataParams<ActivityRequest, Activity> = {
            method: HttpVerbs.PUT,
            requestBody: activityObject,
            headers: { 'Authorization': userStore.getCurrentUserToken }
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY, ApiEndpoints.ACTIVITY + activityObject.id);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    /**
     * Create a request on the server to create a new object of type <Activity>.
     * @param {ActivityRequest} activityObject - the object of type <Activity> 
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null, 
     * otherwise false and reason in error message
     */
    const createActivity = async (activityObject: ActivityRequest): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<ActivityRequest, Activity> = {
            method: HttpVerbs.POST,
            requestBody: activityObject,
            headers: { 'Authorization': userStore.getCurrentUserToken }
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY, ApiEndpoints.ACTIVITIES);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    /**
    * Create a request on the server to remove the object of type <Activity>.
    * @param {String} idActivity - ID of the object of type <Activity> to be deleted 
    * @return <Promise<FetchResponse>> - if request was completed successfully return the property indicating success is true and error message null, 
    * otherwise false and reason in error message
    */
    const deleteActivity = async (idActivity: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, Activity> = {
            method: HttpVerbs.DELETE,
            requestBody: null,
            headers: { 'Authorization': userStore.getCurrentUserToken }
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY, ApiEndpoints.ACTIVITY + idActivity);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }


    const updateAttendance = async (activityId: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, Activity> = {
            method: HttpVerbs.PUT,
            requestBody: null,
            headers: { 'Authorization': userStore.getCurrentUserToken }
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY, ApiEndpoints.ACTIVITY_ATTEND + activityId);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    const toggleCancelActivity = async (activityId: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, Activity> = {
            method: HttpVerbs.PUT,
            requestBody: null,
            headers: { 'Authorization': userStore.getCurrentUserToken }
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY, ApiEndpoints.ACTIVITY_CANCEL + activityId);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }        
    }

    /**
     * Create a request on the server to load list of the objects of <ActivityCategory>. The list is stored in the getter of this hook.
     * @return {Promise<FetchResponse>} - if request was completed successfully return the property indicating success is true and error message null,
     *  otherwise false and reason in error message
     */
    const loadActivityCategories = async (): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<ActivityCategory[], ActivityCategory[]> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: null
        };

        const response = await fetchData(fetchParams, DataObject.ACTIVITY_CATEGORIES, ApiEndpoints.ACTIVITY_CATEGORIES);

        if (response.isSuccessful) {
            categories.value = response.data!;
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
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

    return {
        loadActivities,
        loadSingleActivity,
        updateActivity,
        createActivity,
        deleteActivity,
        updateAttendance,
        toggleCancelActivity,
        loadActivityCategories,
        getActivity,
        getActivities,
        getGroupedByDateActivities,
        getActivityCategories
    }
});


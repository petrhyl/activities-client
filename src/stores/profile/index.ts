import type { AboutSection, PhotoImage, Profile } from "@/models/User";
import type { AddPhotoRequest, FetchDataParams, FetchDataResponse, FetchResponse, } from "@/models/auxillary/interfaces";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import HttpVerbs from "@/utils/constanses/HttpVerbs";
import { DataObject } from "@/utils/constanses/enums";
import { fetchData } from "@/utils/fetchingFunction";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "../user";
import { computed, ref, type ComputedRef, type Ref, reactive } from "vue";

export const useProfileStore = defineStore('profileStore', () => {

    const { getCurrentUserToken, getCurrentUsername } = storeToRefs(useUserStore())

    const currentProfile: Ref<Profile | null> = ref(null)

    const getCurrentProfile: ComputedRef<Profile | null> = computed(() => {
        return currentProfile.value
    })

    const getCurrentAboutSection: ComputedRef<AboutSection> = computed(() => {
        return {
            displayName: currentProfile.value?.displayName ?? '',
            bio: currentProfile.value?.bio ?? ''
        }
    })

    const isProfileFromCurrentUser: Ref<boolean> = computed(() => {
        if (getCurrentUsername.value === '' || !currentProfile.value?.username) {
            return false;
        }

        return getCurrentUsername.value === currentProfile.value.username
    })

    const loadUserProfile = async (username: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, Profile> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: { 'Authorization': getCurrentUserToken.value }
        };

        const response = await fetchData(fetchParams, DataObject.PROFILE, ApiEndpoints.USER_PROFILE + username);

        if (response.isSuccessful) {
            currentProfile.value = response.data
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage,
        }
    }

    const loadProfilePhotos = async (username: string): Promise<FetchDataResponse<PhotoImage[]>> => {
        const fetchParams: FetchDataParams<null, PhotoImage[]> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: { 'Authorization': getCurrentUserToken.value }
        };

        return await fetchData(fetchParams, DataObject.USER_PHOTOS, ApiEndpoints.PHOTO_PROFILE + username);
    }

    const addPhotoToProfile = async (photoRequest: AddPhotoRequest): Promise<FetchResponse> => {

        let formData = new FormData()

        formData.append('file', photoRequest.file)
        formData.append('ismain', photoRequest.isMain ? 'true' : 'false')

        const fetchParams: FetchDataParams<FormData, null> = {
            method: HttpVerbs.POST,
            requestBody: formData,
            headers: {
                'Authorization': getCurrentUserToken.value
            }
        };

        const response = await fetchData(fetchParams, DataObject.FORM_DATA, ApiEndpoints.PHOTO_ADD);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }

    const setPhotoAsMain = async (photoId: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, null> = {
            method: HttpVerbs.POST,
            requestBody: null,
            headers: {
                'Authorization': getCurrentUserToken.value
            }
        };

        const response = await fetchData(fetchParams, DataObject.USER_PHOTOS, ApiEndpoints.PHOTO_SET_MAIN + photoId);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }

    const deletePhoto = async (photoId: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, null> = {
            method: HttpVerbs.DELETE,
            requestBody: null,
            headers: {
                'Authorization': getCurrentUserToken.value
            }
        };

        const response = await fetchData(fetchParams, DataObject.USER_PHOTOS, ApiEndpoints.PHOTO_DELETE + photoId);

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }

    const editUserProfile = async (aboutUser: AboutSection): Promise<FetchResponse> => {
        aboutUser.username = currentProfile.value?.username

        const fetchParams: FetchDataParams<AboutSection, null> = {
            method: HttpVerbs.PUT,
            requestBody: aboutUser,
            headers: {
                'Authorization': getCurrentUserToken.value
            }
        }

        const response = await fetchData(fetchParams, DataObject.PROFILE, ApiEndpoints.USER_PROFILE)

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }

    const toggleFollowing =async (username:string):Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, null> = {
            method: HttpVerbs.POST,
            requestBody: null,
            headers: {
                'Authorization': getCurrentUserToken.value
            }
        }

        const response = await fetchData(fetchParams, DataObject.PROFILE, ApiEndpoints.TOGGLE_FOLLOW + username)

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }


    return {
        getCurrentAboutSection,
        getCurrentProfile,
        isProfileFromCurrentUser,
        loadUserProfile,
        loadProfilePhotos,
        addPhotoToProfile,
        setPhotoAsMain,
        deletePhoto,
        editUserProfile,
        toggleFollowing
    }
})
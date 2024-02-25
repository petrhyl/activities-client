import type { Login, User, UserRegistration } from "@/models/User";
import type { FetchResponse, FetchDataParams } from "@/models/auxillary/interfaces";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import HttpVerbs from "@/utils/constanses/HttpVerbs";
import { DataObject } from "@/utils/constanses/enums";
import { defineStore } from "pinia";
import { useFetchStore } from "../fetch";
import { useUserStore } from "../user";

export const useFetchUserStore = defineStore('fetchUserStore',()=>{
    const { fetchData } = useFetchStore()
    const userStore = useUserStore()
    
    const loginUser = async (login: Login): Promise<FetchResponse> => {       
        const fetchParams: FetchDataParams<Login, User> = {
            method: HttpVerbs.POST,
            requestBody: login
        }

        const response = await fetchData(fetchParams, DataObject.LOGIN, ApiEndpoints.USER_LOGIN);

        if (response.isSuccessful) {
            userStore.saveUserDataToClient(response.data!)
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }

    const registerUser = async (userRegistration: UserRegistration): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<UserRegistration, User> = {
            method: HttpVerbs.POST,
            requestBody: userRegistration
        }

        const response = await fetchData(fetchParams, DataObject.REGISTRATION, ApiEndpoints.USER_REGISTRATION);

        if (response.isSuccessful) {
            userStore.saveUserDataToClient(response.data!)
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: response.errorMessage
        }
    }

    const loadCurrentUserWithRefreshedToken = async (): Promise<void> => {
        const fetchParams: FetchDataParams<null, User> = {
            method: HttpVerbs.GET,
            requestBody: null
        }

        const response = await fetchData(fetchParams, DataObject.CURRENT_USER, ApiEndpoints.REFRESH_TOKEN);

        if (response.isSuccessful) {
            userStore.saveUserDataToClient(response.data!)
        }
    }

    return{
        loginUser,
        registerUser,
        loadCurrentUserWithRefreshedToken
    }
})
import type { Login, User, UserRegistration } from "@/models/User";
import type { FetchDataParams, FetchResponse } from "@/models/auxillary/interfaces";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import HttpVerbs from "@/utils/constanses/HttpVerbs";
import RouteNames from "@/utils/constanses/RouteNames";
import { DataObject } from "@/utils/constanses/enums";
import { fetchData } from "@/utils/fetchingFunction";
import { defineStore } from "pinia";
import { ref, type ComputedRef, type Ref, computed } from "vue";
import { useRouter } from "vue-router";

const tokenStorageKey = 'activityApiJwt'

export const useUserStore = defineStore('userStore', () => {
    const router = useRouter()

    const user: Ref<User | null> = ref(null);

    const isLoggedIn: ComputedRef<boolean> = computed(() => {
        return !!user.value;
    });

    const getCurrentUser: ComputedRef<User | null> = computed(() => {
        return user.value;
    });

    const getCurrentUserToken: ComputedRef<string | null> = computed(() => {
        let token = user.value?.token ?? localStorage.getItem(tokenStorageKey)
        return `Bearer ${token}`
    })

    const loginUser = async (login: Login): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<Login, User> = {
            method: HttpVerbs.POST,
            requestBody: login,
            headers: null
        };

        const response = await fetchData(fetchParams, DataObject.LOGIN, ApiEndpoints.USER_LOGIN);

        if (response.isSuccessful) {
            user.value = response.data!;
            localStorage.setItem(tokenStorageKey, response.data?.token ?? '')
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    const registerUser = async (userRegistration: UserRegistration): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<UserRegistration, User> = {
            method: HttpVerbs.POST,
            requestBody: userRegistration,
            headers: null
        };

        const response = await fetchData(fetchParams, DataObject.REGISTRATION, ApiEndpoints.USER_REGISTRATION);

        if (response.isSuccessful) {
            user.value = response.data!;
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    const getCurrentUserByToken = async (token: string): Promise<FetchResponse> => {
        const fetchParams: FetchDataParams<null, User> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: {'Authorization' : getCurrentUserToken.value}
        };

        const response = await fetchData(fetchParams, DataObject.CURRENT_USER, ApiEndpoints.CURRENT_USER);

        if (response.isSuccessful) {
            user.value = response.data!;
            localStorage.setItem(tokenStorageKey, response.data?.token ?? '')
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }


    const logoutUser = async () => {
        localStorage.removeItem(tokenStorageKey)
        user.value = null
        router.push({ name: RouteNames.HOME })
    }


    return {
        getCurrentUser,
        isLoggedIn,
        getCurrentUserToken,
        loginUser,
        registerUser,
        logoutUser,
        getCurrentUserByToken
    }
});
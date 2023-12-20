import type { ApplicationUser, Login, User, UserRegistration } from "@/models/User";
import type { FetchDataParams, FetchResponse } from "@/models/auxillary/interfaces";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import HttpVerbs from "@/utils/constanses/HttpVerbs";
import RouteNames from "@/utils/constanses/RouteNames";
import { DataObject } from "@/utils/constanses/enums";
import { fetchData } from "@/utils/fetchingFunction";
import { getCookieValueByName, setCookie } from "@/utils/stateUndependentFunctions";
import { defineStore } from "pinia";
import { ref, type ComputedRef, type Ref, computed } from "vue";
import { useRouter } from "vue-router";

const userCookieName = 'activityApplicationUser'

export const useUserStore = defineStore('userStore', () => {
    const router = useRouter()

    const user: Ref<User | null> = ref(null)
    const applicationUser: Ref<ApplicationUser | null> = ref(null)

    const isLoggedIn: ComputedRef<boolean> = computed(() => {
        const token = user.value?.token ?? applicationUser.value?.secret
        return !!token && token !== ''
    });

    const getCurrentUserDisplayName: ComputedRef<string> = computed(() => {
        return user.value?.displayName ?? applicationUser.value?.displayName ?? ''
    })

    const getCurrentUsername: ComputedRef<string> = computed(()=>{
        return user.value?.username ?? applicationUser.value?.identification ?? ''
    })

    const getCurrentUserAfterLogIn: ComputedRef<User | null> = computed(() => {
        return user.value;
    });

    const getCurrentUserToken: ComputedRef<string | null> = computed(() => {
        const token = user.value?.token ?? applicationUser.value?.secret
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
            saveUserData(response.data!)
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
            saveUserData(response.data!)
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
            headers: { 'Authorization': getCurrentUserToken.value }
        };

        const response = await fetchData(fetchParams, DataObject.CURRENT_USER, ApiEndpoints.CURRENT_USER);

        if (response.isSuccessful) {
            saveUserData(response.data!)
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    const logoutUser = async () => {
        setCookie(userCookieName, '', new Date(0))
        user.value = null
        applicationUser.value = null
        router.push({ name: RouteNames.HOME })
    }

    const loadApplicationUserFromCookies = () =>{
        const userString = getCookieValueByName(userCookieName)
        if (!userString || userString === '') {
            applicationUser.value = null

            return;
        }    

        applicationUser.value = JSON.parse(userString)
    }


    const saveUserData = (userData: User) => {
        user.value = userData;
        applicationUser.value = {identification: userData.username, displayName: userData.displayName, secret: userData.token}
        let userCookieExpiresIn = new Date()
        userCookieExpiresIn.setHours(userCookieExpiresIn.getHours() + 12)
        setCookie(userCookieName, JSON.stringify(applicationUser.value), userCookieExpiresIn)
    }


    return {
        getCurrentUserAfterLogIn,
        isLoggedIn,
        getCurrentUserDisplayName,
        getCurrentUsername,
        getCurrentUserToken,
        loginUser,
        registerUser,
        logoutUser,
        getCurrentUserByToken,
        loadApplicationUserFromCookies
    }
});
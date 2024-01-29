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
        loadApplicationUserFromCookies()
        return !!applicationUser.value?.secret && applicationUser.value?.secret !== ''
    });

    const getCurrentUserDisplayName: ComputedRef<string> = computed(() => {
        return user.value?.displayName ?? applicationUser.value?.displayName ?? ''
    })

    const getCurrentUsername: ComputedRef<string> = computed(() => {
        return user.value?.username ?? applicationUser.value?.identification ?? ''
    })

    const getCurrentUserAfterLogIn: ComputedRef<User | null> = computed(() => {
        return user.value;
    });

    const getCurrentUserToken: ComputedRef<string | null> = computed(() => {
        loadApplicationUserFromCookies()
        loadCurrentUserWithRefreshedToken()
        const token = user.value?.token ?? applicationUser.value?.secret
        return `Bearer ${token}`
    })

    const getCurrentUserTokenWithoutBearer: ComputedRef<string | null> = computed(() => {
        loadApplicationUserFromCookies()
        loadCurrentUserWithRefreshedToken()
        return user.value?.token ?? applicationUser.value?.secret ?? null
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
            errorMessage: response.errorMessage
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
            errorMessage: response.errorMessage
        }
    }

    const loadCurrentUserWithRefreshedToken = async (): Promise<void> => {
        const fetchParams: FetchDataParams<null, User> = {
            method: HttpVerbs.GET,
            requestBody: null,
            headers: { 'Authorization': `Bearer ${applicationUser.value?.secret}` }
        };

        const response = await fetchData(fetchParams, DataObject.CURRENT_USER, ApiEndpoints.REFRESH_TOKEN);

        if (response.isSuccessful) {
            saveUserData(response.data!)
        }
    }

    const logoutUser = async () => {
        setCookie(userCookieName, '', new Date(0))
        user.value = null
        applicationUser.value = null
        router.push({ name: RouteNames.HOME })
    }

    const loadApplicationUserFromCookies = () => {
        applicationUser.value = getLoggedUserFromCookies()
    }

    const getLoggedUserFromCookies = (): ApplicationUser | null => {
        const userString = getCookieValueByName(userCookieName)
        if (!userString || userString === '') {
            applicationUser.value = null

            return null;
        }

        return JSON.parse(userString)
    }

    const saveUserData = (userData: User) => {
        user.value = userData;
        applicationUser.value = { identification: userData.username, displayName: userData.displayName, secret: userData.token }
        let userCookieExpiresIn = new Date()
        userCookieExpiresIn.setHours(userCookieExpiresIn.getHours() + 3)
        setCookie(userCookieName, JSON.stringify(applicationUser.value), userCookieExpiresIn)
    }


    return {
        getCurrentUserAfterLogIn,
        isLoggedIn,
        getCurrentUserDisplayName,
        getCurrentUsername,
        getCurrentUserToken,
        getCurrentUserTokenWithoutBearer,
        loginUser,
        registerUser,
        logoutUser,
        loadApplicationUserFromCookies
    }
});
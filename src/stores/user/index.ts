import type { ApplicationUser, User } from "@/models/User";
import RouteNames from "@/utils/constanses/RouteNames";
import { getCookieValueByName, setCookie } from "@/utils/stateUndependentFunctions";
import { defineStore } from "pinia";
import { ref, type ComputedRef, type Ref, computed } from "vue";
import { useRouter } from "vue-router";

const userCookieName = 'activityApplicationUser'

export const useUserStore = defineStore('userStore', () => {
    const router = useRouter()

    const user: Ref<User | null> = ref(null)
    const lastFetchDate: Ref<Date | null> = ref(null)
    const applicationUser: Ref<ApplicationUser | null> = ref(null)

    const isLoggedIn: ComputedRef<boolean> = computed(() => {
        return !!applicationUser.value?.secret && applicationUser.value?.secret !== '' || !!user.value?.token && user.value.token !== ''
    })

    const getCurrentUserDisplayName: ComputedRef<string> = computed(() => {
        return user.value?.displayName ?? applicationUser.value?.displayName ?? ''
    })

    const getCurrentUsername: ComputedRef<string> = computed(() => {
        return user.value?.username ?? applicationUser.value?.identification ?? ''
    })

    const getCurrentUserAfterLogIn: ComputedRef<User | null> = computed(() => {
        return user.value;
    })

    const getCurrentUserToken: ComputedRef<string | null> = computed(() => {
        return user.value?.token ?? applicationUser.value?.secret ?? null
    })

    const getLastFetchingDate: ComputedRef<Date | null> = computed(() => {
        return applicationUser.value?.lastFetch ?? lastFetchDate.value
    })



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

    const saveUserDataToClient = (userData: User) => {
        user.value = userData;
        const actualDate = new Date()
        lastFetchDate.value = actualDate
        applicationUser.value = { identification: userData.username, displayName: userData.displayName, secret: userData.token, lastFetch: actualDate }
        let userCookieExpiresIn = actualDate
        userCookieExpiresIn.setHours(userCookieExpiresIn.getHours() + 3)
        setCookie(userCookieName, JSON.stringify(applicationUser.value), userCookieExpiresIn)
    }


    return {
        getCurrentUserAfterLogIn,
        isLoggedIn,
        getCurrentUserDisplayName,
        getCurrentUsername,
        getCurrentUserToken,
        getLastFetchingDate,
        logoutUser,
        loadApplicationUserFromCookies,
        saveUserDataToClient
    }
});
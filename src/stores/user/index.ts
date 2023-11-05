import type { Login, User, UserRegistration } from "@/models/User";
import type { FetchDataParams } from "@/models/auxillary/interfaces";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import HttpVerbs from "@/utils/constanses/HttpVerbs";
import { DataObject } from "@/utils/constanses/enums";
import { fetchData } from "@/utils/fetchingFunction";
import { defineStore } from "pinia";
import { ref, type ComputedRef, type Ref, computed } from "vue";

export const useUserStore = defineStore('userStore', () => {
    const user: Ref<User | null> = ref(null);

    const isLoggedIn: ComputedRef<boolean> = computed(() => {
        return !!user.value;
    });

    const getCurrentUser: ComputedRef<User | null> = computed(() => {
        return user.value;
    });

    const loginUser = async (login: Login) => {
        const fetchParams: FetchDataParams<Login, User> = {
            method: HttpVerbs.POST,
            requestBody: login
        };

        const response = await fetchData(fetchParams, DataObject.LOGIN, ApiEndpoints.USER_LOGIN);

        if (response.isSuccessful) {
            user.value = response.data!;
        }

        return {
            isSuccessful: response.isSuccessful,
            errorMessage: !response.isSuccessful ? response.errorMessage : null
        }
    }

    const registerUser =async (userRegistration:UserRegistration) => {
        const fetchParams: FetchDataParams<UserRegistration, User> = {
            method: HttpVerbs.POST,
            requestBody: userRegistration
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


    // * * * * * non-vue * * * * *



    return {
        getCurrentUser,
        isLoggedIn,
        loginUser,
        registerUser
    }
});
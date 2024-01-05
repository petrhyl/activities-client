<template>
    <nav class="top-navigation">
        <header>
            <img src="@/assets/logo.png" alt="logo" />
            <RouterLink :to="{ name: RouteNames.HOME }">
                <h1>Activities</h1>
            </RouterLink>
        </header>
        <div class="nav-menu">
            <div v-if="currentWidth! > WindowWidth.TABLET" class="menu-item-list">
                <RouterLink class="navigation-link" :to="{ name: RouteNames.ACTIVITIES }">Show Activities</RouterLink>
                <RouterLink v-if="isLoggedIn" class="navigation-link" :to="{ name: RouteNames.CREATE_ACTIVITY }">Create New Activity
                </RouterLink>
                <div v-if="!isUserLogged" class="account-link-container">
                    <RouterLink class="navigation-link account-link" :to="{ name: RouteNames.LOGIN }">
                        Log In
                    </RouterLink>
                    <RouterLink class="navigation-link account-link" :to="{ name: RouteNames.REGISTERATION }">
                        Sign Up
                    </RouterLink>
                </div>
                <div v-else class="account-link-container">
                    <input type="button" class="navigation-link account-link" @click="handleLogout" value="Log Out" />
                    <RouterLink
                        class="navigation-link account-link"
                        :to="{ name: RouteNames.USER_PROFILE_ABOUT, params: { username: getCurrentUsername } }">
                        {{ getUserName }}
                    </RouterLink>
                </div>
            </div>
            <div v-else class="nav-button-container">
                <button class="nav-button">&#x2630;</button>
            </div>
        </div>
    </nav>
</template>


<script setup lang="ts">
import RouteNames from '@/utils/constanses/RouteNames';
import { WindowWidth } from "@/utils/constanses/enums";
import { inject, ref, watch, type Ref, computed, type ComputedRef } from 'vue';
import { keyProvidedWindowWidth } from '@/models/auxillary/providedKey';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const currentWidth = inject(keyProvidedWindowWidth)

const userStore = useUserStore()
const { isLoggedIn, getCurrentUsername, getCurrentUserDisplayName } = storeToRefs(userStore)

const isUserLogged: Ref<boolean> = ref(isLoggedIn.value)

const getUserName: ComputedRef<string> = computed(() => {
    let userName = getCurrentUserDisplayName.value
    userName = userName.length < 10 ? userName : userName.substring(0, 7) + '...'
    return userName.length === 0 ? '.' : userName
})

const handleLogout = () => {
    userStore.logoutUser()
}

watch(isLoggedIn, () => {
    isUserLogged.value = isLoggedIn.value
})

</script>


<style scoped>
nav {
    width: 100%;
    height: 85px;
    display: flex;
    justify-content: space-around;
    background: var(--gradient-background);
}

header {
    display: flex;
    align-items: center;
}

h1 {
    font-family: Geneva, Verdana, sans-serif;
    font-size: 22pt;
    color: var(--dark-blue-color);
    margin: auto;
}

.nav-menu {
    display: flex;
    align-items: center;
}

.menu-item-list {
    display: flex;
    align-items: center;
    column-gap: 35px;
}

img {
    height: 85%;
    margin-right: 25px;
}

.account-link-container {
    display: flex;
    column-gap: 15px;
}

.navigation-link {
    height: fit-content;
    font-size: 16pt;
    font-family: 'Franklin Gothic Medium', sans-serif;
    line-height: 18pt;
    text-decoration: none;
    color: var(--gold-color);
    background-color: transparent;
    transition: all 170ms ease-out;
}

.account-link {
    border: 2px solid #d8cfad;
    border-radius: 7px;
    padding: 4px 8px;
    font-size: 14pt;
}

.navigation-link:hover {
    color: var(--light-gold-color);
    transform: scale(1.1);
}

.navigation-link.router-link-active {
    transform: scale(1.1);
}

.nav-button {
    width: calc(26pt + 14px);
    height: calc(26pt + 14px);
    color: #001a68;
    font-size: 26pt;
    font-weight: 900;
    line-height: 26pt;
    background-color: transparent;
    outline: none;
    border: 2px solid #001a68;
    border-radius: 5px;
    padding: 5px 7px 9px 7px;
}
</style>
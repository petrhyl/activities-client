<script setup lang="ts">
import RouteNames from '@/utils/constanses/RouteNames';
import { WindowWidth } from "@/utils/constanses/OtherEnums";
import { inject } from 'vue';
import { keyProvidedWindowWidth } from '@/models/auxillary/providedKey';

const currentWidth = inject(keyProvidedWindowWidth);

</script>

<template>
    <nav class="top-navigation">
        <header>
            <img src="@/assets/logo.png" alt="logo" />
            <RouterLink :to="{ name: RouteNames.HOME }">
                <h1>Activities</h1>
            </RouterLink>
        </header>
        <div class="nav-menu">
            <div v-if="currentWidth! <= WindowWidth.TABLET" class="nav-button-container">
                <button class="nav-button">&#x2630;</button>
            </div>
            <div v-else class="menu-item-list">
                <RouterLink :to="{ name: RouteNames.ACTIVITIES }">Show Activities</RouterLink>
                <RouterLink :to="{ name: RouteNames.CREATE_ACTIVITY }">Create New Activity</RouterLink>
            </div>
        </div>
    </nav>
</template>


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
    color: #001a68;
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

a {
    height: fit-content;
    font-size: 16pt;
    font-family: 'Franklin Gothic Medium', sans-serif;
    line-height: 18pt;
    text-decoration: none;
    color: #d8cfad;
    transition: all 170ms ease-out;
}

a:hover {
    color: #eee5c5;
    transform: scale(1.1);
}

a.router-link-active {
    transform: scale(1.1);
}

.nav-button{
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
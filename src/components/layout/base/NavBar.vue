<template>
    <nav class="top-navigation">
        <header>
            <img src="@/assets/logo.png" alt="logo" />
            <h1>Reactivities</h1>
        </header>
        <menu>
            <RouterLink :to="{ name: RouteNames.ACTIVITIES }">Show Activities</RouterLink>
            <RouterLink :to="{ name: RouteNames.CREATE_ACTIVITY }">Create New Activity</RouterLink>
        </menu>
    </nav>
</template>

<script setup lang="ts">
import RouteNames from '@/utils/constanses/RouteNames';


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
}

h1 {
    font-family: Geneva, Verdana, sans-serif;
    font-size: 22pt;
    color: #3e1126;
    margin: auto;
}

menu {
    display: flex;
    align-items: center;
    column-gap: 35px;
}

img {
    margin-right: 25px;
    padding: 10px 0;
}

a {
    height: fit-content;
    font-size: 16pt;
    font-family: 'Franklin Gothic Medium', sans-serif;
    line-height: 16pt;
    text-decoration: none;
    color: #d8cfad;
    transition: all 170ms ease-out;
}

a:hover {
    color: #eee5c5;
    transform: scale(1.1);
}

a.router-link-active{
    transform: scale(1.1);
}
</style>
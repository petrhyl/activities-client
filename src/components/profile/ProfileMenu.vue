<template>
<ul class="menu-links">
    <li>
        <RouterLink :to="{name: RouteNames.USER_PROFILE_ABOUT}">About</RouterLink>
    </li>
    <li>
        <RouterLink :to="{name: RouteNames.USER_PROFILE_PHOTOS}">Photo</RouterLink>
    </li>
    <li>
        <RouterLink :to="{name: RouteNames.USER_PROFILE_EVENTS}">Events</RouterLink>
    </li>
    <li>
        <RouterLink :to="{name: RouteNames.USER_PROFILE_FOLLOWERS}">Followers</RouterLink>
    </li>
    <li>
        <RouterLink :to="{name: RouteNames.USER_PROFILE_FOLLOWEES}">Followees</RouterLink>
    </li>
</ul>
</template>


<script setup lang="ts">
import RouteNames from '@/utils/constanses/RouteNames';



</script>


<style scoped>
.menu-links{
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-links li a{
    display: flex;
    font-family: 'Franklin Gothic Medium', sans-serif;
    font-weight: 600;
    font-size: 13pt;
    color: var(--dark-blue-color);
    padding: 10px 15px;
    border-bottom: 1px solid var(--light-gray-color);
    transition: all 120ms ease-in-out;
}

.menu-links li a:hover{
    background-color: var(--light-gold-color);
}

.menu-links li a.router-link-exact-active{
    padding: calc(10px - 2pt) 15px;
    font-size: 14pt;
    color: var(--blue-color);
}
</style>
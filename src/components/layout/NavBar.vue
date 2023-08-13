<template>
<nav>
    <header>
        <img src="@/assets/logo.png" alt="logo" />
        <h1>Reactivities</h1>
    </header>
    <menu>
        <RouterLink to="/activities">Show Activities</RouterLink>
        <RouterLink to="/create-new">Create New Activity</RouterLink>
    </menu>
</nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
nav{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    background: linear-gradient(80deg, #b7ffe7 10%, #1c7db4 75%, #92d7ff 100%);
}

header{
    display: flex;
}

h1{
    font-family: Geneva, Verdana, sans-serif;
    font-size: 22pt;
    color: #3e1126;
    margin: auto;
}

menu{
    display: flex;
    align-items: center;
    column-gap: 35px;
}

img{
    margin-right: 25px;
}

a{
    height: fit-content;
    font-size: 16pt;
    font-family: 'Franklin Gothic Medium', sans-serif;
    line-height: 16pt;
    text-decoration: none;
    color: #d8cfad;
    transition: all 170ms ease-out;
}

a:hover{
    color: #eee5c5;
    transform: scale(1.1);
}
</style>
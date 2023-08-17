<template>
    <h2>{{ activity.title }}</h2>
    <div class="activity-date">{{ dateTimeString }}</div>
    <div class="activity-content">
        <p>{{ activity.description }}</p>
        <span>{{ activity.city }}</span>
    </div>
    <div class="activity-footer">
        <span class="activity-category">{{ activity.category }}</span>
        <RouterLink :to="getRouteLink">View</RouterLink>
    </div>
</template>


<script setup lang="ts">
import type { Activity } from '@/models/activity';
import { computed, type ComputedRef } from 'vue';
import { RouterLink } from 'vue-router';


const props = defineProps<{
    activity: Activity
}>();

const getRouteLink: ComputedRef<string> = computed(()=>{
    return `/activities/${props.activity.id}`
});

const dateTimeString: ComputedRef<string> = computed(()=>{
    const d: Date = new Date(props.activity.beginDate);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
});
</script>


<style scoped>
h2{
    margin: 5px 0 15px 20px;
}

.activity-content p{
    margin-bottom: 5px;
}

.activity-footer{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.activity-footer a{
    font-size: 14pt;
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', sans-serif;
    text-decoration: none;
    color: rgb(110, 2, 134);
    background: linear-gradient(90deg, #b7ffe7 10%, #8bd3fd);
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 7px 20px;
    cursor: pointer;
}

.activity-category{
    padding: 7px 12px;
    border: 1px solid gray;
    border-radius: 5px;
}
</style>
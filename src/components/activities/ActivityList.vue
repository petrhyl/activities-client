<template>
<ul class="card">
    <li v-for="activity in props.activities" :key="activity.id">
        <ActivityComponent :activity="activity" :key="activity.id" />
    </li>
</ul>
</template>

<script setup lang="ts">
import type { Activity } from '@/models/activity';
import  ActivityComponent  from "./ActivityComponent.vue";


const props = defineProps<{
    activities: Activity[]
}>();
</script>

<style scoped>
ul{
    width: 100%;
    list-style: none;    
    margin: 0 0 auto 0;
}

li{    
    margin-bottom: 10px;
    padding: 0 0 10px 0;
    border-bottom: 2px solid #b8bdca;
}
</style>
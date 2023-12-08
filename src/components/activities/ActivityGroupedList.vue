<template>
    <ul class="grouped-list">
        <li v-for="[groupDate, activities] in groupedActivities">
            <div class="grouped-date">{{ groupDate }}</div>
            <ActivityList
                :activities="activities"
                @on-delete-item="handleDeleteActivity"
                :is-deleting-activity="isDeletingActivity" />
        </li>
    </ul>
</template>


<script setup lang="ts">
import type { Activity } from '@/models/Activity';
import ActivityList from './ActivityList.vue';


const props = defineProps<{
    groupedActivities: [string, Activity[]][],
    isDeletingActivity: boolean
}>();

const emits = defineEmits<{
    (e: 'on-delete-activity', idActivity: string): void
}>();

const handleDeleteActivity = (idActivity: string) => {
    emits('on-delete-activity', idActivity);
}

</script>


<style scoped>
ul.grouped-list {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    padding: 0;
    margin-bottom: 10px;
}

.grouped-date{
    font-weight: 400;
    font-family:Impact, Haettenschweiler, sans-serif;
    color: #2537b1;
    padding: 5px 0 10px 15px;
}
</style>
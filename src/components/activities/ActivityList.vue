<template>
    <CardLayout :use-padding="false">
        <ul class="activity-list">
            <li v-for="activity in props.activities" :key="activity.id">
                <ActivityListItem
                    :activity="activity"
                    :key="activity.id"
                    @on-delete="handleDeleteActivity"
                    :is-deleting="isDeletingActivity && deletingActivityId === activity.id" />
            </li>
        </ul>
    </CardLayout>
</template>

<script setup lang="ts">
import type { Activity } from '@/models/Activity';
import CardLayout from "@/components/layout/base/CardLayout.vue";
import ActivityListItem from "./ActivityListItem.vue";
import { ref, type Ref } from 'vue';


const props = defineProps<{
    activities: Activity[],
    isDeletingActivity: boolean
}>();

const deletingActivityId: Ref<string> = ref('');

const emits = defineEmits<{
    (e: 'on-delete-item', idItem: string): void
}>();

const handleDeleteActivity = (activityId: string) => {
    deletingActivityId.value = activityId;
    emits('on-delete-item', activityId);
}

</script>


<style scoped>
.activity-list {
    width: 100%;
    list-style: none;
    margin: 0 0 25px 0;
    padding: 0;
}

li {
    margin-bottom: 10px;
    padding: 0;
    border-bottom: 2px solid #b8bdca;
}

li:last-child {
    border-bottom: none;
}
</style>
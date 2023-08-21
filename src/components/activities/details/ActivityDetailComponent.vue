<template>
 <div class="card">
        <div>
            <img :src="getImageLocation" alt="category">
            <h2>{{ activity.title }}</h2>
            <div class="date">{{ dateTimeString }}</div>
            <div>{{ activity.city }}</div>
            <div>{{ activity.venue }}</div>
            <p>category: {{ activity.category }}</p>
            <p>{{ activity.description }}</p>
        </div>
        <div class="detail-footer">
            <div class="user-actions">
                <button @click="emits('join-activity')">Join Activity</button>
                <button @click="emits('cancel-attendance')">Cancel Attendance</button>
            </div>
            <div class="edit-button">
                <button @click="emits('triger-edit')">Edit</button>
            </div>
        </div>
    </div>
    <div class="card">

    </div>
</template>


<script setup lang="ts">
import type { Activity } from '@/models/Activity';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';
import { computed, type ComputedRef } from 'vue';

 
const props = defineProps<{
    activity: Activity
}>();

const emits = defineEmits<{
    (e: 'triger-edit'): void,
    (e: 'join-activity'): void
    (e: 'cancel-attendance') : void
}>();

const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(props.activity.beginDate);
    return DateTimeToCzechFormat(d);
});

const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${props.activity.category}.jpg`;
});

</script>


<style scoped>
img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.activity-detail {
    position: relative;
}

.detail-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

button {
    font-size: 13pt;
    font-weight: 600;
    color: #262525;
    outline: none;
    border: 1px solid #7b9ae1;
    padding: 7px 0;
}

button:first-child {
    background-color: #b7ffe7;
    border-right-width: 1px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

button:last-child {
    background-color: #92d7ff;
    border-left-width: 1px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

button:hover {
    border-color: #ade1ff;
}

button:active {
    outline: none;
}
</style>
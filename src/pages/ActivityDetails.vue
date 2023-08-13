<template>
    <div class="card">
        <div>
            <img v-if="activity" :src="getImageLocation" alt="category">
            <h2>{{ activity?.title }}</h2>
            <div class="date">{{ activity?.beginDate }}</div>
            <p>{{ activity?.description }}</p>
        </div>
        <div class="detail-footer">
            <button>Edit</button>
            <button @click="emits('cancel-show')">Cancel</button>
        </div>
    </div>
    <ActivityForm v-if="isFormVisible" />
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/ActivityForm.vue';
import type { Activity } from '@/models/activity';
import { ref, type ComputedRef, type Ref, computed, onBeforeMount, toRef, watch } from 'vue';


const props = defineProps<{
    activityId: string
}>();

const emits = defineEmits(['cancel-show']);

const activity: Ref<Activity | undefined> = ref();

const isFormVisible: ComputedRef<boolean> = computed(() => {
    return true;
});

const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${activity.value?.category}.jpg`;
});

watch(props, async (current, prev) => {    
     await fetchData(current.activityId);
});

const fetchData = async (activityId: string) => {
    fetch(`https://localhost:5000/api/activities/${activityId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Cannot load the activity details!');
            }

            return res.json();
        })
        .then(data => {
            activity.value = data;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

onBeforeMount(async () => {
    await fetchData(props.activityId);
});
</script>


<style scoped>
img {
    width: 100%;
    height: auto;
    border-radius: 5px;
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
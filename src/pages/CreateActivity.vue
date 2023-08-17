<template>
    <div class="container">
        <div v-if="isResponded" :class="{ response: true, error: !isSuccessResponse, success: isSuccessResponse }">
            {{ responseMessage }}
        </div>
        <ActivityForm @cancel-form="handleCancelForm" @submit-form="handleCreateActivity" :activity-to-edit="undefined" />
    </div>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/activities/ActivityForm.vue';
import type { Activity } from '@/models/activity';
import RouteNames from '@/router/routeNames';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const isResponded: Ref<boolean> = ref(false);
const isSuccessResponse: Ref<boolean> = ref(true);
const responseMessage: Ref<string> = ref('');

const handleCancelForm = () => {
    router.push({ name: RouteNames.ACTIVITIES });
}

const handleCreateActivity = async (activity: Activity) => {
    await createActivityOnServer(activity);
}

const createActivityOnServer = async (activity: Activity) => {
    fetch('https://localhost:5000/api/activities', {
        method: 'POST',
        body: JSON.stringify(activity),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error('Activity could not be created!');
        }

        isSuccessResponse.value = true;
        responseMessage.value = 'The activity was successfully created!'
    }).catch(err => {
        isSuccessResponse.value = false;
        responseMessage.value = err ? err.message : 'Activity could not be created!';
    }).finally(() => isResponded.value = true);
}
</script>

<style scoped>
.container {
    width: 50%;
    margin: 25px auto;
}

.response {
    margin-bottom: 20px;
    font-size: 13pt;
    font-family: Impact, Haettenschweiler, sans-serif;
}

.error {
    color: #ab0039;
}

.success {
    color: #00a600;
}
</style>
<template>
    <div class="container">
        <div v-if="isResponded" :class="{ response: true, error: !isSuccessResponse, success: isSuccessResponse }">
            {{ responseMessage }}
        </div>
        <ActivityForm
            @cancel-form="handleCancelForm"
            @submit-form="handleCreateActivity"
            :activity-to-edit="null"
            :is-submitting="isSubmittingData" />
    </div>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/activities/ActivityForm.vue';
import type { Activity } from '@/models/Activity';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const activityStore = useActivityStore();

const isResponded: Ref<boolean> = ref(false);
const isSuccessResponse: Ref<boolean> = ref(true);
const responseMessage: Ref<string> = ref('');
const isSubmittingData: Ref<boolean> = ref(false);

const handleCancelForm = () => {
    router.push({ name: RouteNames.ACTIVITIES });
}

const handleCreateActivity = async (activity: Activity) => {
    isSubmittingData.value = true;
    await createActivityOnServer(activity);
}

const createActivityOnServer = async (activity: Activity) => {
    const response = await activityStore.createActivity(activity);

    if (!response.isSuccessful && response.errorMessage) {
        responseMessage.value = response.errorMessage;
    }

    isResponded.value = true;
    isSubmittingData.value = false;
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
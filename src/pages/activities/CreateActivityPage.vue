<template>
    <div class="container">
        <ResponseMessage v-if="isResponded" :is-error="!isSuccessResponse" :message="responseMessage" />
        <ActivityForm
            v-if="!isResponded"
            @refresh-form="handleClearForm"
            @submit-form="handleCreateActivity"
            :activity-to-edit="activityObject"
            :is-submitting="isSubmittingData" />
    </div>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/activities/details/ActivityForm.vue';
import ResponseMessage from '@/components/layout/ResponseMessage.vue';
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
const activityObject : Ref<Activity | null> = ref(null);

const handleClearForm = () => {
    activityObject.value = {
        title: '',
        category: '',
        description: '',
        beginDate: new Date(),
        city: '',
        venue: ''
    };
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

</style>
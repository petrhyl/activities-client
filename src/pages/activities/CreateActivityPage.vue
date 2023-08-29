<template>
    <PageContainer>
        <div class="create-activity-page">
            <ResponseMessage v-if="submitResponse.isResponded" :is-error="!submitResponse.isSuccessful" :message="submitResponse.message" />
            <ActivityForm v-if="!submitResponse.isResponded"
                @refresh-form="handleClearForm"
                @submit-form="handleCreateActivity"
                :submit-response="submitResponse" />
                <div v-if="submitResponse.isResponded" class="back-link-container">
                    <input v-if="submitResponse.isSuccessful" class="back-link" type="button" value="Create another" @click="handleCreateAnother">
                    <input type="button" class="back-link" value="View all activities" @click="handleViewAll" />
                </div>
        </div>
    </PageContainer>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/activities/details/ActivityForm.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import ResponseMessage from '@/components/layout/ResponseMessage.vue';
import type { Activity } from '@/models/Activity';
import type { SubmitResponse } from '@/models/auxillary/interfaces';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';


const clearSubmitResponse = { isResponded: false, isSuccessful: true, message: '' };

const router = useRouter();
const activityStore = useActivityStore();

const submitResponse: Ref<SubmitResponse> = ref(clearSubmitResponse);
const activityObject: Ref<Activity | null> = ref(null);


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

const handleCreateAnother = () => {
   handleClearForm();
   submitResponse.value = clearSubmitResponse;      
}

const handleViewAll = () => {
    router.push({name: RouteNames.ACTIVITIES});
}

const handleCreateActivity = async (activity: Activity) => {
    const response = await activityStore.createActivity(activity);

    submitResponse.value.isResponded = true;
    submitResponse.value.isSuccessful = response.isSuccessful
    submitResponse.value.message = response.errorMessage ?? 'Event was successfully created!';
}
    
</script>

<style scoped>
@import url('@/styles/style.css');

.create-activity-page {
    width: 40%;
    margin: 25px auto;
}

.back-link-container{
    width: 100%;
    margin-top: 20px;
}
</style>
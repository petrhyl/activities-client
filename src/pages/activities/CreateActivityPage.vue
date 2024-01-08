<template>
    <PageContainer>
        <div class="create-activity-page">
            {{ activityObject.title }}
            <ResponseMessage v-if="submitResponse.isResponded" :is-error="!submitResponse.isSuccessful"
                :message="submitResponse.message" />
            <ActivityForm
                v-if="!submitResponse.isResponded"
                @submit-form="handleCreateActivity"
                :activity-to-edit="activityObject" />
            <div v-else class="back-link-container">
                <input
                    v-if="submitResponse.isSuccessful"
                    class="back-link"
                    type="button"
                    value="Create another"
                    @click="handleCreateAnother">
                <input type="button" class="back-link" value="View all activities" @click="handleViewAll" />
            </div>
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/details/ActivityForm.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import type { ActivityRequest } from '@/models/Activity';
import type { SubmitResponse } from '@/models/auxillary/interfaces';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';


const emptyActivity: ActivityRequest = {
    title: '',
    category: {
        id: '-1',
        value: '',
        name: ''
    },
    description: '',
    beginDate: new Date(),
    city: '',
    venue: '',
    isActive: true
}
const clearSubmitResponse = {
    isResponded: false,
    isSuccessful: true,
    message: ''
};

const router = useRouter();
const activityStore = useActivityStore();

const submitResponse: SubmitResponse = reactive(clearSubmitResponse);
const activityObject: ActivityRequest = reactive(emptyActivity);


watch(activityObject, () => {
})

const handleCreateAnother = () => {
    submitResponse.isResponded = clearSubmitResponse.isResponded;
    submitResponse.isSuccessful = clearSubmitResponse.isSuccessful;
    submitResponse.message = clearSubmitResponse.message;
}

const handleViewAll = () => {
    router.push({ name: RouteNames.ACTIVITIES });
}

const handleCreateActivity = async (activity: ActivityRequest) => {
    const response = await activityStore.createActivity(activity);

    submitResponse.isResponded = true;
    submitResponse.isSuccessful = response.isSuccessful
    submitResponse.message = response.errorMessage ?? 'Event was successfully created!';
}

</script>


<style scoped>
@import url('@/styles/style.css');

.create-activity-page {
    width: 50%;
    margin: 25px auto;
}

.back-link-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    column-gap: 25px;
}


@media screen and (max-width: 1200px) {
    .create-activity-page {
        width: 60%;
    }
}

@media screen and (max-width: 980px) {
    .create-activity-page {
        width: 70%;
    }
}

@media screen and (max-width: 670px) {
    .create-activity-page {
        width: 90%;
    }
}
</style>
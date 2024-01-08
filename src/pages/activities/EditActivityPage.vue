<template>
    <PageContainer>
        <div class="edit-activity-page">
            <LoadActivity :activity-id="activityId">
                <ResponseMessage v-if="submitResponse?.isResponded" :is-error="!submitResponse.isSuccessful"
                    :message="submitResponse.message" />
                <ActivityForm v-if="!submitResponse"
                    @refresh-form="handleRefreshForm"
                    @submit-form="handleUpdateActivity"
                    :activity-to-edit="activityToEdit" />
                <div v-if="submitResponse?.isResponded" class="back-link-container">
                    <input v-if="submitResponse.isSuccessful" class="back-link" type="button" value="View updated Activity"
                        @click="handleLinkClick(false)">
                    <input class="back-link" type="button" value="Go back to all activities" @click="handleLinkClick(true)">
                </div>
            </LoadActivity>
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/details/ActivityForm.vue';
import LoadActivity from '@/components/activities/details/LoadActivity.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import type { ActivityRequest } from '@/models/Activity';
import type { SubmitResponse } from '@/models/auxillary/interfaces';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { mapToActivityRequest } from '@/utils/stateUndependentFunctions';
import { storeToRefs } from 'pinia';
import { ref, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    activityId: string
}>();

const activityStore = useActivityStore();
const router = useRouter();

const { getActivity } = storeToRefs(activityStore);

const activityToEdit: Ref<ActivityRequest | null> = ref(mapToActivityRequest(getActivity.value));
const submitResponse: Ref<SubmitResponse | null> = ref(null);


watch(getActivity, () => {
    setActivityToNull();
    setActivityToItsValue();
});

const setActivityToNull = () => {
    activityToEdit.value = null;
}

const setActivityToItsValue = () => {
    activityToEdit.value = mapToActivityRequest(getActivity.value);
}

const handleLinkClick = (toAll: boolean) => {
    if (toAll) {
        router.push({ name: RouteNames.ACTIVITIES });
    } else {
        router.push({ name: RouteNames.ACTIVITY_DETAIL, params: { activityId: props.activityId } });
    }
}

const handleRefreshForm = () => {
    activityToEdit.value = mapToActivityRequest(getActivity.value);
}

const handleUpdateActivity = async (activity: ActivityRequest) => {
    activity.id = props.activityId
    const response = await activityStore.updateActivity(activity);
    if (!response.isSuccessful) {
        submitResponse.value = {
            isResponded: true,
            isSuccessful: response.isSuccessful,
            message: response.errorMessage!
        };
    } else {
        submitResponse.value = {
            isResponded: true,
            isSuccessful: response.isSuccessful,
            message: 'The Activity was updated!'
        };
    }
}

</script>


<style scoped>
@import url('@/styles/style.css');

.edit-activity-page {
    width: 40%;
    margin: 20px auto;
}

.back-link-container {
    display: flex;
    justify-content: center;
    column-gap: 25px;
    width: 100%;
    margin-top: 20px;
}

.back-link-containe .back-link:first-child {
    margin-bottom: 20px;
}


@media screen and (max-width: 1200px) {
    .edit-activity-page {
        width: 55%;
    }
}

@media screen and (max-width: 980px) {
    .edit-activity-page {
        width: 75%;
    }
}

@media screen and (max-width: 670px) {
    .edit-activity-page {
        width: 97%;
    }
}
</style>
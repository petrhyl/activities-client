<template>
    <PageContainer>
        <div class="edit-activity-page">
            <LoadActivity :activity-id="activityId">
                <ActivityForm
                    @refresh-form="handleRefreshForm"
                    @submit-form="handleUpdateActivity"
                    :activity-to-edit="activityToEdit"
                    :submit-response="submitResponse">
                </ActivityForm>
                <div v-if="submitResponse?.isResponded" class="back-link-container">
                    <input class="back-link" type="button" :value="linkText" @click="handleLinkClick">
                </div>
            </LoadActivity>
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/details/ActivityForm.vue';
import LoadActivity from '@/components/activities/details/LoadActivity.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import type { Activity } from '@/models/Activity';
import type { SubmitResponse } from '@/models/auxillary/interfaces';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { storeToRefs } from 'pinia';
import { ref, type ComputedRef, type Ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    activityId: string
}>();

const activityStore = useActivityStore();
const router = useRouter();

const { getActivity } = storeToRefs(activityStore);

const activityToEdit: Ref<Activity | null> = ref(getActivity.value);
const submitResponse: Ref<SubmitResponse | null> = ref(null);


const linkText: ComputedRef<string> = computed(() => {
    return submitResponse.value?.isSuccessful ? 'View updated Activity' : 'Go back to all activities'
});

watch(getActivity, () => {
    setActivityToNull();
    setActivityToItsValue();
});

const setActivityToNull = () => {
    activityToEdit.value = null;
}

const setActivityToItsValue = () => {
    activityToEdit.value = getActivity.value;
}

const handleLinkClick = () => {
    if (submitResponse.value?.isSuccessful) {
        router.push({ name: RouteNames.ACTIVITY_DETAIL, params: { activityId: props.activityId } });
    } else {
        router.push({ name: RouteNames.ACTIVITIES });
    }
}

const handleRefreshForm = () => {
    activityToEdit.value = getActivity.value;
}

const handleUpdateActivity = async (activity: Activity) => {
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
    width: 100%;
    margin-top: 20px;
}
</style>
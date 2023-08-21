<template>
    <PageContainer>
        <div class="edit-activity">
            <ActivityForm
                @refresh-form="handleClearForm"
                @submit-form="handleUpdateActivity"
                :activity-to-edit="getActivity"
                :is-submitting="isSubmittingData" />
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/details/ActivityForm.vue';
import PageContainer from '@/components/layout/PageContainer.vue';
import ResponseMessage from '@/components/layout/ResponseMessage.vue';
import type { Activity } from '@/models/Activity';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    activityId: string
}>();

const router = useRouter()
const activityStore = useActivityStore();

const { getActivity } = storeToRefs(activityStore)

const isSubmittingData: Ref<boolean> = ref(false);

const handleClearForm = () => {
    router.push({ name: RouteNames.ACTIVITY_DETAIL });
}

const handleUpdateActivity = async (activity: Activity) => {
    isSubmittingData.value = true;

    await updateActivityOnServer(activity);
}

const updateActivityOnServer = async (activity: Activity) => {

}

const isFormValid = (activityObject: Activity) => {
    let isValid = true;

    if (activityObject.title.trim() === '') {
        isValid = false;
    }

    if (activityObject.description.trim() === '') {
        isValid = false;
    }

    if (activityObject.city.trim() === '') {
        isValid = false;
    }

    if (activityObject.category.trim() === '') {
        isValid = false;
    }

    if (activityObject.beginDate === new Date(0) || new Date(activityObject.beginDate).toString() === 'Invalid Date') {
        isValid = false;
    }

    return isValid;
}
</script>


<style></style>
<template>
    <PageContainer>
        <LoadActivity :activity-id="activityId">
            <ResponseMessage
                v-if="errorMessageOfChangeAttendance !== ''"
                :is-error="true"
                :message="errorMessageOfChangeAttendance" />
            <ActivityDetailComponent
                @update-attendance="handleUpdateAttendance"
                @toggle-cancel-activity="handleToggleCancelActivity"
                :are-manage-buttons-disabled="areManageButtonsDisabled" />
        </LoadActivity>
    </PageContainer>
</template>


<script setup lang="ts">
import ActivityDetailComponent from '@/components/activities/details/ActivityDetailComponent.vue';
import LoadActivity from '@/components/activities/details/LoadActivity.vue';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import { useActivityStore } from '@/stores/activities';
import { ref, type Ref } from 'vue';


const props = defineProps<{
    activityId: string
}>();


const activityStore = useActivityStore();

const errorMessageOfChangeAttendance: Ref<string> = ref('')
const areManageButtonsDisabled: Ref<boolean> = ref(false)

const handleUpdateAttendance = async () => {
    const respose = await activityStore.updateAttendance(props.activityId)
    if (!respose.isSuccessful) {
        errorMessageOfChangeAttendance.value = respose.errorMessage ?? 'Attandance is not changed.'
        return
    }

    await activityStore.loadSingleActivity(props.activityId)

    areManageButtonsDisabled.value = false
}

const handleToggleCancelActivity = async () => {
    const respose = await activityStore.toggleCancelActivity(props.activityId)

    if (!respose.isSuccessful) {
        errorMessageOfChangeAttendance.value = respose.errorMessage ?? 'Cannot cancel this activity.'
        return
    }

    await activityStore.loadSingleActivity(props.activityId)

    areManageButtonsDisabled.value = false
}

</script>

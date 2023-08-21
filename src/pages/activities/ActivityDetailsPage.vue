<template>
    <div class="activity-detail">
        <LoadingLayer :is-loading="isActivityLoading" :error-message="errorMessage">
            <ActivityDetailComponent
                v-if="getActivity"
                :activity="getActivity"
                @triger-edit="handleEdit"
                @join-activity="handleJoinActivity"
                @cancel-attendance="handleCancelAttendance" />
        </LoadingLayer>
        
    </div>
</template>


<script setup lang="ts">
import ActivityDetailComponent from '@/components/activities/details/ActivityDetailComponent.vue';
import LoadingLayer from '@/components/layout/LoadingLayer.vue';
import type { Activity } from '@/models/Activity';
import { useActivityStore } from '@/stores/activities';
import RouteNames from '@/utils/constanses/RouteNames';
import { storeToRefs } from 'pinia';
import { ref, type ComputedRef, type Ref, computed, onBeforeMount, watch, inject } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    activityId: string
}>();

const router = useRouter();
const activityStore = useActivityStore();

const { getActivity } = storeToRefs(activityStore);
const isFormVisible: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');
const isActivityLoading: Ref<boolean> = ref(true);
const isSubmittingData: Ref<boolean> = ref(false);

onBeforeMount(async () => {
    await loadActivity(props.activityId);
});


const loadActivity = async (id: string) => {
    errorMessage.value = '';

    const response = await activityStore.loadSingleActivity(id);
    if (!response.isSuccessful && response.errorMessage) {
        errorMessage.value = response.errorMessage;
    }

    isActivityLoading.value = false;
}

const detailElement = ref<HTMLDivElement | null>();

const handleEdit = () => {
   router.push({name: RouteNames.EDIT_ACTIVITY});
}

const handleCancelAttendance = () => {
    router.push('/activities');
}

const handleCancelEdit = () => {
    isFormVisible.value = false;
}

const handleJoinActivity = () => {
}

</script>


<style scoped>

</style>
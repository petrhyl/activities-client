<template>
    <div class="load-single-activity">
        <LoadingLayer :is-loading="isActivityLoading" :error-message="errorMessage">
            <slot v-if="errorMessage === ''"></slot>
        </LoadingLayer>
    </div>
</template>


<script setup lang="ts">
import LoadingLayer from '@/components/layout/base/LoadingLayer.vue';
import { useActivityStore } from '@/stores/activities';
import { onBeforeMount, ref, type Ref } from 'vue';

const props = defineProps<{
    activityId: string
}>();

const activityStore = useActivityStore();

const isActivityLoading: Ref<boolean> = ref(true);
const errorMessage: Ref<string> = ref('');

onBeforeMount(async () => {
    isActivityLoading.value = true;
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

</script>


<style scoped>
.load-single-activity {
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
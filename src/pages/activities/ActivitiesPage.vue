<template>
  <PageContainer>
    <div class="activities">
      <div class="grid-column">
        <p v-if="errorMessage !== ''">{{ errorMessage }}</p>
        <LoadingComponent v-if="!isLoaded" />
        <ActivityGroupedList
          :grouped-activities="getGroupedByDateActivities"
          @on-delete-activity="handleDeleteActivity"
          :is-deleting-activity="isActivityDeleting" />
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref, provide } from 'vue';
import { useActivityStore } from '@/stores/activities';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import RouteNames from '@/utils/constanses/RouteNames';
import LoadingComponent from '@/components/layout/LoadingComponent.vue';
import ActivityGroupedList from '@/components/activities/ActivityGroupedList.vue';
import PageContainer from '@/components/layout/PageContainer.vue';


const activityStore = useActivityStore();
const router = useRouter();

const { getGroupedByDateActivities } = storeToRefs(activityStore);
const errorMessage: Ref<string> = ref('');
const isLoaded: Ref<boolean> = ref(false);
const isActivityDeleting: Ref<boolean> = ref(false);

const handleDeleteActivity = async (idItem: string) => {
  isActivityDeleting.value = true;

  const responseMessage = await activityStore.deleteActivity(idItem);

  if (!responseMessage.isSuccessful) {
    errorMessage.value = responseMessage.errorMessage!;
  } else {
    if (router.currentRoute.value.name === RouteNames.ACTIVITY_DETAIL) {
      router.currentRoute.value.params.activityId === idItem;
      router.replace({ name: RouteNames.ACTIVITIES });
    }
  }

  await loadActivities();
}

const loadActivities = async () => {
  const responseMessage = await activityStore.loadActivities();

  if (!responseMessage.isSuccessful && responseMessage.errorMessage) {
    errorMessage.value = responseMessage.errorMessage;
  }

  isLoaded.value = true;
  isActivityDeleting.value = false;
}

provide('refreshList', () => { loadActivities() });

onBeforeMount(async () => {
  await loadActivities();
});
</script>

<style>
.grid-column {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
<template>
  <div class="activities">
    <div class="grid-column">
      <LoadingComponent v-if="!isLoaded" />
      <p v-if="errorMessage !== ''">{{ errorMessage }}</p>
      <ActivityList :activities="getActivities" @on-delete-item="handleDeleteActivity"
        :is-deleting-activity="isActivityDeleting" />
    </div>
    <div class="grid-column">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch, type Ref, provide, type InjectionKey } from 'vue';
import ActivityList from '@/components/activities/ActivityList.vue';
import { useActivityStore } from '@/stores/activities';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import RouteNames from '@/utils/constanses/RouteNames';
import LoadingComponent from '@/components/layout/LoadingComponent.vue';


const activityStore = useActivityStore();
const router = useRouter();

const { getActivities } = storeToRefs(activityStore);
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
.activities {
  display: grid;
  grid-template-columns: 0.65fr 0.35fr;
  column-gap: 25px;
  margin-top: 25px;
}

.grid-column {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
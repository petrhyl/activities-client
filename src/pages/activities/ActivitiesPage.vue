<template>
  <PageContainer>
    <div class="activities-page">
      <div class="grid-column">
        <p v-if="errorMessage !== ''" class="error-message">{{ errorMessage }}</p>
        <LoadingComponent v-if="!isLoaded" />
        <ActivityGroupedList
          :grouped-activities="getGroupedByDateActivities"
          @on-delete-activity="handleDeleteActivity"
          :is-deleting-activity="isActivityDeleting" />
      </div>
      <div>
        <ActivityFilters />
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
import LoadingComponent from '@/components/layout/base/LoadingComponent.vue';
import ActivityGroupedList from '@/components/activities/ActivityGroupedList.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import ActivityFilters from '@/components/activities/ActivityFilters.vue';
import { ScrollPageToTop } from '@/utils/stateUndependentFunctions';
import type { ActivityListOptions } from '@/models/Activity';
import { ActivityListQuery } from "@/utils/objects/ActivityListQuery";


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
    ScrollPageToTop()
  } else {
    if (router.currentRoute.value.name === RouteNames.ACTIVITY_DETAIL) {
      router.currentRoute.value.params.activityId === idItem;
      router.replace({ name: RouteNames.ACTIVITIES });
    }
  }

  await loadActivities();
}

const loadActivities = async () => {
  const queries = router.currentRoute.value.query
  let activityListOptions = new ActivityListQuery()

  for (const key in queries) {
    if (Object.prototype.hasOwnProperty.call(queries, key)) {
      const element = queries[key];
      if(typeof element === 'string'){
        activityListOptions.setQuery(key, element)
      }
    }
  }

  const responseMessage = await activityStore.loadActivities(activityListOptions);

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



<style scoped>
.activities-page{
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
}

.grid-column {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 0 auto;
}

.error-message{
  font-size: 13pt;
  color: var(--warning-color);
}
</style>
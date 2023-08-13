<template>
  <div class="activities">
    <KeepAlive>
      <ActivityList :activities="activities" />
    </KeepAlive>
    <div class="grid-column">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { type Activity } from "@/models/activity";
import ActivityList from '@/components/activities/ActivityList.vue';
import { onBeforeRouteUpdate } from 'vue-router';


const activities: Ref<Activity[]> = ref([]);

const fetchData = async () => {
  fetch('https://localhost:5000/api/activities')
    .then(response => {
      if (!response.ok) {
        throw new Error('Cannot load activities!');
      }

      return response.json();
    })
    .then(data => {
      activities.value = data;
    });
};

onBeforeMount(async () => {
  await fetchData();
});
</script>

<style>
.activities {
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  column-gap: 25px;
  margin-top: 25px;
}

.grid-column {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
<template>
    <PageContainer>
        <LoadActivity :activity-id="activityId">
            <ActivityDetailComponent />
        </LoadActivity>
    </PageContainer>
</template>


<script setup lang="ts">
import ActivityDetailComponent from '@/components/activities/details/ActivityDetailComponent.vue';
import LoadActivity from '@/components/activities/details/LoadActivity.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';


const props = defineProps<{
    activityId: string
}>();

</script>


<style scoped></style>
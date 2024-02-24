<template>
    <FollowingComponent :list-title="'Followees'" :api-endpoint="ApiEndpoints.FOLLOWEES + username" />
</template>


<script setup lang="ts">
import FollowingComponent from '@/components/profile/details/followings/FollowingComponent.vue';
import { ApiEndpoints } from '@/utils/constanses/ApiEndpoints';


const props = defineProps<{
    username: string
}>()

</script>


<style scoped></style>
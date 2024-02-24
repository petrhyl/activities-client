<template>
    <FollowingComponent :list-title="'Followers'" :api-endpoint="ApiEndpoints.FOLLOWERS + username" />
</template>


<script setup lang="ts">
import FollowingComponent from '@/components/profile/details/followings/FollowingComponent.vue';
import { ApiEndpoints } from '@/utils/constanses/ApiEndpoints';


const props = defineProps<{
    username: string
}>()

</script>


<style scoped>
</style>
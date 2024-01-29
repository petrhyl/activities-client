<template>
    <div class="user-followers">
        <div class="header">
            <span class="title">Your followers</span>
        </div>
        <LoadingLayer>
            <FollowerList />
        </LoadingLayer>
    </div>
</template>


<script setup lang="ts">
import { ref, type Ref } from 'vue';
import FollowerList from "@/components/profile/details/followers/FollowerList.vue";
import LoadingLayer from '@/components/layout/base/LoadingLayer.vue';


const props = defineProps<{
    username: string
}>()


const warningMessage: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(true)


</script>


<style scoped>
</style>
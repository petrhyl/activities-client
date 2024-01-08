<template>
    <div class="loading-layer">
        <ResponseMessage v-if="!isLoading && errorMessage !== ''" :is-error="true" :message="errorMessage" />
        <LoadingComponent v-if="isLoading" />
        <slot v-if="!isLoading"></slot>
    </div>
</template>


<script setup lang="ts">
import LoadingComponent from '@/components/layout/base/LoadingComponent.vue';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';


const props = withDefaults(defineProps<{
    isLoading: boolean,
    errorMessage: string
}>(), { isLoading: true, errorMessage: '' });
</script>


<style scoped>
.loading-layer{
    position: relative;
    width: 100%;
    min-height: 20vh;
    height: 100%;
}
</style>
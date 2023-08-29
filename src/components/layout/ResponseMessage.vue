<template>
 <div class="response-message">
    <span :class="getCssClass">{{ message }}</span>
 </div>
</template>


<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';



const props = withDefaults(defineProps<{
    isError: boolean,
    message: string
}>(),{isError: true, message: ''})

const getCssClass: ComputedRef<string> = computed(() => {
    return props.isError ? 'error-response' : 'success-response'
});
</script>

<style>
.response-message{
    width: 100%;
    margin: 15px 0;
}

.response-message span{
    width: 100%;
    font-size: 13pt;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    text-align: center;
}

.error-response{
    color: #74001b;
}

.success-response{
    color: #003c20;
}
</style>
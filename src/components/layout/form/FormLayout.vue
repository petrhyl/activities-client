<template>
<form @submit.prevent="emits('submit-form')" :class="cssStyle">
    <slot></slot>
</form>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    formStyles: string
}>();

const emits = defineEmits<{
    (e: 'submit-form'):void
}>();

const cssStyle = computed(()=>{
    return `${props.formStyles} form`
});

</script>

<style scoped>
.form{
    width:100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
}
</style>

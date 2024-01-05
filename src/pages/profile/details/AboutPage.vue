<template>
    <div class="about-section">
        {{ about }}
    </div>
</template>


<script setup lang="ts">
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import { watch, type Ref, ref } from 'vue';


const { getCurrentAboutSection } = storeToRefs(useProfileStore())

const about: Ref<string> = ref(getCurrentAboutSection.value)

watch(getCurrentAboutSection, () => {
    about.value = getCurrentAboutSection.value
})
</script>


<style scoped></style>
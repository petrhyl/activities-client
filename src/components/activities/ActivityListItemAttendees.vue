<template>
<ul class="attender-list">
    <li v-for="attendor in attendors" class="single-attender">
        <img class="attender-image" :src="attendor.attender.imageUrl" alt="attender">
        <div class="attender-name">{{ attendor.attender.displayName }}</div>
    </li>
</ul>
</template>


<script setup lang="ts">
import type { Attendee } from '@/models/Activity';


const props = defineProps<{
    attendors: Attendee[]
}>()
</script>


<style>
.attender-list{
    list-style: none;
    display: flex;
    column-gap: 15px;
    padding: 0;
}
</style>
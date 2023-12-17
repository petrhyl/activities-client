<template>
<ul class="attender-list">
    <li v-for="attender in attenders">
        <AttenderComponent :attendee="attender" :attenders-picture-size="35" />
    </li>
</ul>
</template>


<script setup lang="ts">
import type { Attendee } from '@/models/Activity';
import AttenderComponent from './AttenderComponent.vue';


const props = defineProps<{
    attenders: Attendee[]
}>()

</script>


<style scoped>

.attender-list{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    column-gap: 25px;
    padding: 0;
}

</style>
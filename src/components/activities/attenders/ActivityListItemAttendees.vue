<template>
    <ul class="attender-list">
        <li v-for="attender in attenders">            
            <AttenderComponent :attendee="attender" :attenders-picture-size="35" :image-text-gap="10" />
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
.attender-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    padding: 0;
}

.attender-list li {
    min-width: calc(20% - 14px);
    background-color: #f1f7fd;
    border: 1px solid var(--light-gray-color);
    border-radius: 25px / 50%;
    padding: 5px;
    margin-bottom: 5px;
}
</style>
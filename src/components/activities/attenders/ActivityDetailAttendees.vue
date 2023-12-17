<template>
    <CardLayout header-text="Attenders" :has-header-small-title="true">
        <ul class="attender-list">
            <li v-for="attendee in attenders">
                <AttenderComponent :attendee="attendee" :attenders-picture-size="50" />
                <div v-if="attendee.isHost" class="host-flag">Host</div>
            </li>
        </ul>
    </CardLayout>
</template>


<script setup lang="ts">
import type { Attendee } from '@/models/Activity';
import AttenderComponent from './AttenderComponent.vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';


const props = defineProps<{
    attenders: Attendee[]
}>();

</script>


<style scoped>
ul.attender-list {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.attender-list li {
    position: relative;
}

.host-flag {
    position: absolute;
    top: 10%;
    right: -15px;
    background-color: #ff8c4e;
    padding: 2px 7px;
    z-index: 5;
}

.host-flag::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 7px;
    background-color: #ff8c4e;
    transform-origin: top;
    transform: skewX(-15deg);
}

.host-flag::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 7px;
    background-color: #ff8c4e;
    transform-origin: bottom;
    transform: skewX(-15deg);
}
</style>
<template>    
    <ul class="attender-list">
        <li>
            <AttenderComponent />
        </li>
    </ul>
</template>


<script setup lang="ts">
import AttenderComponent from './AttenderComponent.vue';


const props = defineProps<{
    attenders: string[]
}>();

</script>


<style scoped>
ul.attender-list {
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
    margin: 0;
    list-style: none;
}
</style>
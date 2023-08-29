<template>
<div class="activity-filter card">
    <div class="header">
        <RowWithImageIcon image-source="/src/assets/filter-icon.png" image-alternative-text="filters">
            <h2>Filters</h2>
        </RowWithImageIcon>
    </div>
    <div class="filter-buttons">
        <button class="filtering-button">I'm going to</button>
        <button class="filtering-button">I'm hosting</button>
        <button class="filtering-button">I'm going to</button>
    </div>
</div>
</template>


<script setup lang="ts">
import RowWithImageIcon from '../layout/RowWithImageIcon.vue';


</script>


<style scoped>
.activity-filter{
    width: 100%;
    padding: 0 0 15px 0;
    margin: 34px 0 auto 0;
}

.header{
    padding: 15px;
    background: linear-gradient(75deg, var(--sky-color) 10%, #1c7db4 60%, var(--azure-color)) ;
}

.filter-buttons{
    display: flex;
    flex-direction: column;
    padding: 15px 15px;
}

.filtering-button{
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    border: none;
    border-bottom: 1px solid var(--light-gray-color);
    outline: none;
    padding: 8px 0;
}
</style>
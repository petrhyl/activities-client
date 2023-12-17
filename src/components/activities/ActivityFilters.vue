<template>
    <CardLayout :use-slot-for-header="true" :card-css="'activity-filter'" :has-title-dark-color="true">
        <template v-slot:header>
            <RowWithImageIcon image-source="/src/assets/filter-icon.png" image-alternative-text="filters">
                <h2>Filters</h2>
            </RowWithImageIcon>
        </template>
        <div class="filter-buttons">
            <button class="filtering-button">I'm going to</button>
            <button class="filtering-button">I'm hosting</button>
            <button class="filtering-button">I'm going to</button>
        </div>
    </CardLayout>
</template>


<script setup lang="ts">
import RowWithImageIcon from '../layout/RowWithImageIcon.vue';
import CardLayout from '../layout/base/CardLayout.vue';


</script>


<style>
.activity-filter {
    margin: 34px 0 auto 0;
}
</style>


<style scoped>
.header {
    padding: 15px;
    background: linear-gradient(75deg, var(--sky-color) 10%, #1c7db4 60%, var(--azure-color));
}

.filter-buttons {
    display: flex;
    flex-direction: column;
}

.filtering-button {
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    border: none;
    border-bottom: 1px solid var(--light-gray-color);
    outline: none;
    padding: 8px 0;
}
</style>
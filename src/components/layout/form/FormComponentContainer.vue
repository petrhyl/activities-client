<template>
<div class="form-component-container">
    <slot></slot>
</div>
</template>


<script setup lang="ts">

</script>


<style scoped>
.form-component-container{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 25px;
}

@media screen and (max-width: 670px) {
    .form-component-container{
        display: flex;
        flex-direction: column;
    }
}
</style>
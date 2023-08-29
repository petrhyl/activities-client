<template>
<div class="attender">
    <RowWithImageIcon image-source="/src/assets/user.png" image-alternative-text="attender" :image-width="50">
        <div class="info">
            <span>name</span>
            <span></span>
        </div>
    </RowWithImageIcon>
</div>
</template>


<script setup lang="ts">
import RowWithImageIcon from '@/components/layout/RowWithImageIcon.vue';
</script>


<style scoped>
.attender{
    padding-top: 10px;
}
</style>
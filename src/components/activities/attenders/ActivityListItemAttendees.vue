<template>
    <ul class="attender-list">
        <li v-for="attender in attenders">
            <RouterLink
                v-if="isLoggedIn"
                :to="{ name: RouteNames.USER_PROFILE, params: { username: attender.attender.username } }">
                <AttenderComponent :attendee="attender" :attenders-picture-size="35" :image-text-gap="10" />
            </RouterLink>
            <AttenderComponent v-else :attendee="attender" :attenders-picture-size="35" :image-text-gap="10" />
        </li>
    </ul>
</template>


<script setup lang="ts">
import type { Attendee } from '@/models/Activity';
import AttenderComponent from './AttenderComponent.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import RouteNames from '@/utils/constanses/RouteNames';


const props = defineProps<{
    attenders: Attendee[]
}>()


const { isLoggedIn } = storeToRefs(useUserStore())

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
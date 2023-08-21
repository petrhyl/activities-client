<template>
    <div class="single-activity">
        <div class="activity-header">
            <div class="user-image">
                <img src="@/assets/user.png" alt="user">
            </div>
            <div class="title">
                <h2>{{ activity.title }}</h2>
                <div class="activity-hosted-by"><span>Hosted by </span><span class="activity-host">Bob</span></div>
            </div>
        </div>
        <div class="activity-content">
            <div class="date-city-category">
                <div>
                    <img class="icon" src="@/assets/clock-icon.png" alt="date">
                    <span>{{ dateTimeString }}</span>
                </div>
                <div>
                    <img class="icon" src="@/assets/location-pin-icon.png" alt="location">
                    <span>{{ activity.city }}</span>
                </div>                
            </div>            
        </div>
        <div>
            attendors
        </div>
        <div class="activity-footer">         
            <span class="activity-category">{{ activity.category }}</span>
            <div class="activity-footer-buttons">
                <RouterLink :to="getRouteLink" :class="{ button: true, disabled: isDeleting }">View</RouterLink>
                <button @click="emits('on-delete', activity.id!)" :class="{ button: true, disabled: isDeleting }"
                    :disabled="isDeleting">Delete</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import type { Activity } from '@/models/Activity';
import RouteNames from '@/utils/constanses/RouteNames';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';
import { computed, type ComputedRef } from 'vue';
import { RouterLink, type LocationAsRelativeRaw } from 'vue-router';


const props = defineProps<{
    activity: Activity,
    isDeleting: boolean
}>();

const emits = defineEmits<{
    (e: 'on-delete', activityId: string): void
}>();

const getRouteLink: ComputedRef<LocationAsRelativeRaw> = computed(() => {
    return {
        name: RouteNames.ACTIVITY_DETAIL,
        params: {
            activityId: props.activity.id!
        }
    }
});

const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(props.activity.beginDate);
    return DateTimeToCzechFormat(d);
});
</script>


<style scoped>
.single-activity {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 2px solid #b8bdca;
}

.activity-header {
    display: grid;
    grid-template-columns: 1fr 6fr;
    gap: 5%;
}

.activity-header h2 {
    margin: 5px 0 10px 0px;
}

.activity-header h3 {
    margin: 0 0 auto 0;
}

.activity-header .user-image {
    padding: 10px 20px 15px 5px;
}

.activity-header .user-image img {
    width: 100%;
    height: auto;
    margin: auto;
    border-radius: 50%;
}

.activity-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 10px;
    margin-bottom: 15px;
}

img.icon {
    width: 15px;
    height: auto;
    margin-right: 10px;
}

.activity-content .date-city-category{
    width: 100%;
    display: flex;
    column-gap: 5%;
}

.activity-content .date-city-category>div{
    display: inline-flex;
    align-items: center;
}

.activity-content .date-city-category span{
    font-family: 'Lucida Sans', Geneva, sans-serif;
    color: rgb(103, 92, 92);
}

.activity-category {
    padding: 7px 12px;
    border: 1px solid gray;
    border-radius: 5px;
}

.activity-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.activity-footer-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    align-items: end;
}

.button {
    height: fit-content;
    font-size: 13pt;
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', sans-serif;
    letter-spacing: 1px;
    text-align: center;
    border-radius: 5px;
    padding: 7px 17px;
    cursor: pointer;
}

.activity-footer-buttons a {
    text-decoration: none;
    color: rgb(110, 2, 134);
    background: linear-gradient(90deg, #abfee2 10%, #8bd3fd);
}

.activity-footer-buttons button {
    color: #806a6a;
    background-color: #b8cad4;
    outline: none;
    border: none;
}

.activity-footer p {
    font-family: 'Trebuchet MS', Calibri, sans-serif;
    margin: 0;
    padding-top: 10px;
}

a.disabled,
button.disabled {
    pointer-events: none;
    background-color: #c5c5c5;
    color: #9f9f9f;
}
</style>
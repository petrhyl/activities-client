<template>
    <div class="single-activity">
        <div class="activity-header">
            <div class="user-image">
                <img src="@/assets/user.png" alt="user">
            </div>
            <div class="title">
                <h2>{{ activity.title }}</h2>
                <div class="activity-hosted-by">
                    <span>Hosted by </span>
                    <span class="activity-host">{{ getHostOfActivity?.attender.displayName }}</span>
                </div>
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
        <div class="activity-attendors">
            <ActivityListItemAttendees v-if="activity.attenders.length > 0" :attendors="activity.attenders" />
        </div>
        <div class="activity-footer">
            <span class="activity-category">{{ activity.category.name }}</span>
            <div class="activity-footer-buttons">
                <StyledButton :button-type="ButtonTypes.LINK" :link-to="getRouteLink" :css-class="getRoutLinkClass"
                    text="View" />
                <StyledButton :button-type="ButtonTypes.BUTTON" text="Delete"
                    @click-button="emits('on-delete', activity.id!)" :css-class="getDeleteButtonClass"
                    :is-disabled="isDeleting" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import StyledButton from '@/components/layout/form/StyledButton.vue';
import type { Activity, Attendee } from '@/models/Activity';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import RouteNames from '@/utils/constanses/RouteNames';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';
import { computed, type ComputedRef } from 'vue';
import { type LocationAsRelativeRaw } from 'vue-router';
import ActivityListItemAttendees from './ActivityListItemAttendees.vue';


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

const getRoutLinkClass: ComputedRef<string> = computed(() => {
    let css = 'link';

    if (props.isDeleting) {
        css = `${css} disabled`;
    }

    return css;
});

const getDeleteButtonClass: ComputedRef<string> = computed(() => {
    let css = 'delete';

    if (props.isDeleting) {
        css = `${css} disabled`;
    }

    return css;
});

const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(props.activity.beginDate);
    return DateTimeToCzechFormat(d);
});

const getHostOfActivity: ComputedRef<Attendee | undefined> = computed(() => {
    return props.activity.attenders.find(a => a.isHost)
})
</script>


<style scoped>
.single-activity {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 2px solid #b8bdca;
}

.activity-header {
    display: grid;
    grid-template-columns: 1fr 7fr;
    gap: 5%;
    margin-bottom: 20px;
    padding: 5px 0px 0px 10px;
}

.activity-header h2 {
    margin-bottom: 10px;
}

.activity-header h3 {
    margin: 0 0 auto 0;
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

.activity-content .date-city-category {
    width: 100%;
    display: flex;
    column-gap: 5%;
}

.activity-content .date-city-category>div {
    display: inline-flex;
    align-items: center;
}

.activity-content .date-city-category span {
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

.activity-footer p {
    font-family: 'Trebuchet MS', Calibri, sans-serif;
    margin: 0;
    padding-top: 10px;
}

@media screen and (max-width: 870px) {
    .activity-header {
        grid-template-columns: 1fr 4fr;
        gap: 20px;
    }
}

@media screen and (max-width: 680px) {
    .activity-header {
        grid-template-columns: 1fr 3fr;
        gap: 20px;
    }
}
</style>

<style>
.activity-footer-buttons .link {
    text-decoration: none;
    color: rgb(110, 2, 134);
    background: linear-gradient(90deg, #abfee2 10%, #8bd3fd);
}

.activity-footer-buttons .delete {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.activity-footer-buttons .delete:hover {
    background-color: #a4b7c2;
}

.disabled {
    pointer-events: none;
    background-color: #c5c5c5;
    color: #9f9f9f;
}
</style>
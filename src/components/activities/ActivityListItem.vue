<template>
    <li :id="getTeleportToId">
        <div class="single-activity">
            <div v-if="!activity.isActive" class="is-cancelled-flag">Cancelled</div>
            <div class="activity-header">
                <div class="user-image-container">
                    <ImageComponent
                        image-css="user-image"
                        :image-url="activity.host.imageUrl"
                        alternative-image-text="attender"
                        :use-alternative-element="true">
                        <img src="@/assets/user.png" alt="attender" class="user-image" />
                    </ImageComponent>
                </div>
                <div class="title">
                    <h2>{{ activity.title }}</h2>
                    <div class="activity-hosted-by">
                        <span>Hosted by </span>
                        <span class="activity-host">{{ activity.host.displayName }}</span>
                    </div>
                    <div v-if="isHostedByCurrentUser" class="current-user-host">
                        <span>Hosting</span>
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
                <ActivityListItemAttendees v-if="activity.attenders.length > 0" :attenders="activity.attenders" />
            </div>
            <div class="activity-footer">
                <span class="activity-category">{{ activity.category.name }}</span>
                <div :class="getButtonWrapperClass">
                    <StyledButton :button-type="ButtonTypes.LINK" :link-to="getRouteLink" :css-class="getRoutLinkClass"
                        text="View" />
                    <StyledButton v-if="isHostedByCurrentUser" :button-type="ButtonTypes.BUTTON" text="Delete"
                        @click-button="handleOpenModal" :css-class="getDeleteButtonClass"
                        :is-disabled="isDeleting" />
                </div>
            </div>
            <TeleportedModal
                v-if="isModalOpen"
                :teleport-to="`#${getTeleportToId}`"
                :title="`Activity: ${activity.title}`"
                :content="'Do you really want to delete this activity?'"
                @click-background="handleCloseModal"
                @cancel-button="handleCloseModal"
                @confirm-button="handleConfirmDelete" />
        </div>
    </li>
</template>


<script setup lang="ts">
import StyledButton from '@/components/layout/form/StyledButton.vue';
import type { Activity } from '@/models/Activity';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import RouteNames from '@/utils/constanses/RouteNames';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { type LocationAsRelativeRaw } from 'vue-router';
import ActivityListItemAttendees from '@/components/activities/attenders/ActivityListItemAttendees.vue';
import ImageComponent from '@/components/layout/ImageComponent.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import TeleportedModal from '../layout/TeleportedModal.vue';


const props = defineProps<{
    activity: Activity,
    isDeleting: boolean
}>()

const emits = defineEmits<{
    (e: 'on-delete', activityId: string): void
}>()


const { getCurrentUsername } = storeToRefs(useUserStore())

const isModalOpen: Ref<boolean> = ref(false)

const getRouteLink: ComputedRef<LocationAsRelativeRaw> = computed(() => {
    return {
        name: RouteNames.ACTIVITY_DETAIL,
        params: {
            activityId: props.activity.id!
        }
    }
})
const getRoutLinkClass: ComputedRef<string> = computed(() => {
    let css = 'link';

    if (props.isDeleting) {
        css = `${css} disabled`;
    }

    return css;
})
const getDeleteButtonClass: ComputedRef<string> = computed(() => {
    let css = 'delete';

    if (props.isDeleting) {
        css = `${css} disabled`;
    }

    return css;
})
const getButtonWrapperClass: ComputedRef<string> = computed(() => {
    return isHostedByCurrentUser.value ? 'activity-footer-buttons' : 'activity-footer-detail-link'
})
const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(props.activity.beginDate);
    return DateTimeToCzechFormat(d);
})
const isHostedByCurrentUser: ComputedRef<boolean> = computed(() => {
    const hostName = props.activity.host.username
    return !!hostName && getCurrentUsername.value === hostName
})
const getTeleportToId: ComputedRef<string> = computed(() => `single-activity-item-${props.activity.id}`)


const handleCloseModal = () => {
    isModalOpen.value = false
}

const handleOpenModal = () => {
    isModalOpen.value = true
}

const handleConfirmDelete = () => {
    emits('on-delete', props.activity.id)
}

</script>



<style scoped>
.activity-footer-detail-link:deep() .link,
.activity-footer-buttons:deep() .link {
    text-decoration: none;
    color: #30006d;
    background: linear-gradient(90deg, #abfee2 10%, #8bd3fd);
}

.activity-footer-detail-link:deep() .link:hover,
.activity-footer-buttons:deep() .link:hover {
    color: #51218f;
    box-shadow: 0 0 3px 0px var(--blue-color) inset;
}

.activity-footer-buttons:deep() .delete {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.activity-footer-buttons:deep() .delete:hover {
    background-color: #a4b7c2;
}


.activity-footer-buttons:deep() .disabled {
    pointer-events: none;
    background-color: #c5c5c5;
    color: #9f9f9f;
}
.activity-header:deep() .user-image {
    width: 100%;
    overflow: hidden;
    border-radius: 50%;
    margin: auto;
}

.single-activity {
    width: 100%;
    padding: 15px;
}

.is-cancelled-flag {
    width: 100%;
    text-align: center;
    color: #e7e8e8;
    background-color: var(--warning-color);
    border-radius: 5px;
    padding: 3px;
    margin-bottom: 5px;
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

.user-image-container {
    display: flex;
}

.activity-header .title {
    display: flex;
    flex-direction: column;
}

.activity-hosted-by {
    margin-bottom: 10px;
}

.activity-hosted-by span{
    font-family: 'Lucida Sans', Geneva, sans-serif;
    font-size: 11pt;
}

.current-user-host {
    display: flex;
}

.current-user-host span {
    width: fit-content;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 11pt;
    font-weight: 600;
    color: var(--sky-color);
    border: 2px solid var(--sky-color);
    border-radius: 5px;
    padding: 5px 7px;
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
    color: #675c5c;
}

.activity-attendors {
    padding: 5px 10px 0px 10px;
    background-color: #e3f4fc;
    border: 1px solid #d0e8ed;
    border-radius: 5px;
}

.activity-category {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 11pt;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 7px 12px;
}

.activity-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.activity-footer-detail-link {
    display: flex;
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

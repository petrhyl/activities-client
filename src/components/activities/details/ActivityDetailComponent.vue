<template>
    <div class="detail-component" v-if="getActivity">
        <div class="page-section">
            <div class="detail-header">
                <ActivityDetailInfo
                    :header-image-url="getImageLocation"
                    :title="getActivity.title"
                    :date="dateTimeString"
                    :category="getActivity.category.name"
                    :hosted-by="getHostName"
                    :is-cancelled="!getActivity.isActive"
                    :is-hosted-by-current-user="isHostedByCurrentUser"
                    :is-joined-by-current-user="isJoinedByCurrentUser"
                    :is-current-user-logged-in="isLoggedIn"
                    :are-manage-buttons-disabled="areManageButtonsDisabled"
                    @cancel-attendance="emits('update-attendance')"
                    @join-activity="emits('update-attendance')"
                    @triger-edit="handleEdit"
                    @toggle-cancel-activity="emits('toggle-cancel-activity')" />
            </div>
            <div class="detail-content">
                <CardLayout>
                    <div class="detail-content-items">
                        <RowWithImageIcon image-source="/src/assets/calendar-icon.png" image-alternative-text="date">
                            <span>{{ dateTimeString }}</span>
                        </RowWithImageIcon>
                        <RowWithImageIcon image-source="/src/assets/location-pin-icon.png"
                            image-alternative-text="location">
                            <span>{{ getActivity.city }}, {{ getActivity.venue }}</span>
                        </RowWithImageIcon>
                        <RowWithImageIcon image-source="/src/assets/info-icon.png" image-alternative-text="info">
                            <span>{{ getActivity.description }}</span>
                        </RowWithImageIcon>
                    </div>
                </CardLayout>
            </div>
            <div class="detail-chat">
                <ActivityChat :is-canceled="!getActivity.isActive" :activity-id="getActivity.id" :is-user-logged-in="isLoggedIn" />
            </div>
        </div>
        <div class="page-section">
            <ActivityDetailAttendees :attenders="getActivity.attenders" :is-user-logged-in="isLoggedIn" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { useActivityStore } from '@/stores/activities';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';
import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';
import ActivityDetailInfo from '@/components/activities/details/info/ActivityDetailInfo.vue';
import RowWithImageIcon from '@/components/layout/RowWithImageIcon.vue';
import ActivityChat from './chat/ActivityChat.vue';
import { useRouter } from 'vue-router';
import RouteNames from '@/utils/constanses/RouteNames';
import ActivityDetailAttendees from '../attenders/ActivityDetailAttendees.vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';
import { useUserStore } from '@/stores/user';


const props = defineProps<{
    areManageButtonsDisabled: boolean
}>()

const emits = defineEmits<{
    (e: 'update-attendance'): void,
    (e: 'toggle-cancel-activity'): void
}>()


const activityStore = useActivityStore();
const router = useRouter();

const { getActivity } = storeToRefs(activityStore);
const { getCurrentUsername, isLoggedIn } = storeToRefs(useUserStore())

const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(getActivity.value?.beginDate ?? 0)
    return DateTimeToCzechFormat(d)
})
const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${getActivity.value?.category.value}.jpg`
})
const getHostName: ComputedRef<string> = computed(() => getActivity.value?.host.displayName ?? '')
const isHostedByCurrentUser: ComputedRef<boolean> = computed(() => {
    return getActivity.value?.host.username === getCurrentUsername.value
})
const isJoinedByCurrentUser: ComputedRef<boolean> = computed(() => {
    return getActivity.value?.attenders.some(a => a.attender.username === getCurrentUsername.value && !a.isHost) ?? false
})

const handleEdit = () => {
    if (getActivity.value) {
        const activityId = getActivity.value.id;
        router.push({ name: RouteNames.EDIT_ACTIVITY, params: { activityId } })
    }
}


</script>



<style scoped>
.detail-component {
    display: grid;
    grid-template-columns: 3.5fr 2fr;
    column-gap: 25px;
}

.page-section {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.detail-content-items {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.detail-content-items>div {
    border-bottom: 2px solid #cccccc;
    padding-bottom: 8px;
}

.detail-content-items span {
    display: flex;
    align-items: center;
    font-family: 'Lucida Sans', Geneva, sans-serif;
}


@media screen and (max-width: 670px) {
    .image-background {
        height: 27vh;
        background-position-x: center;
    }

    .main-info {
        padding: 0 0 10px 30px;
    }

    .main-info h1 {
        font-size: 15pt;
        margin-bottom: 10px;
    }

    .main-info .info-detail {
        margin-bottom: 10px;
    }

    .main-info .date {
        font-size: 11pt;
        margin-bottom: 10px;
    }
}
</style>
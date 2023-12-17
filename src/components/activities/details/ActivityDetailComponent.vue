<template>
    <div class="detail-component" v-if="getActivity">
        <div class="grid-column">
            <div class="detail-header">
                <ActivityDetailInfo
                    :header-image-url="getImageLocation"
                    :title="getActivity.title"
                    :date="dateTimeString"
                    :category="getActivity.category.name"
                    :hosted-by="getHostName"
                    @cancel-attendance="handleCancelAttendance"
                    @join-activity="handleJoinActivity"
                    @triger-edit="handleEdit" />
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
                <ActivityChat />
            </div>
        </div>
        <div class="grid-column">
            <ActivityDetailAttendees :attenders="getActivity.attenders" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { useActivityStore } from '@/stores/activities';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';
import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';
import ActivityDetailInfo from './ActivityDetailInfo.vue';
import RowWithImageIcon from '@/components/layout/RowWithImageIcon.vue';
import ActivityChat from './chat/ActivityChat.vue';
import { useRouter } from 'vue-router';
import RouteNames from '@/utils/constanses/RouteNames';
import ActivityDetailAttendees from '../attenders/ActivityDetailAttendees.vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';


const activityStore = useActivityStore();
const router = useRouter();

const { getActivity } = storeToRefs(activityStore);

const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(getActivity.value?.beginDate ?? 0);
    return DateTimeToCzechFormat(d);
});

const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${getActivity.value?.category.value}.jpg`;
});

const getHostName: ComputedRef<string> = computed(() => {
    return getActivity.value?.attenders.find(a => a.isHost)?.attender.displayName ?? '';
});


const handleCancelAttendance = () => {

}

const handleJoinActivity = () => {

}

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
    grid-template-columns: 3fr 2fr;
    column-gap: 20px;
}

.grid-column {
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
    font-family: Arial, Helvetica, sans-serif;
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
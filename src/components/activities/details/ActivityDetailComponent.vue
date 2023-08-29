<template>
    <div class="detail-component" v-if="getActivity">
        <div class="grid-column">
            <div class="detail-header card">
                <ActivityDetailInfo
                    :header-image-url="getImageLocation"
                    :title="getActivity.title"
                    :date="dateTimeString"
                    :category="getActivity.category"
                    :hosted-by="getHost"
                    @cancel-attendance="handleCancelAttendance"
                    @join-activity="handleJoinActivity"
                    @triger-edit="handleEdit" />
            </div>
            <div class="detail-content card">
                <RowWithImageIcon image-source="/src/assets/calendar-icon.png" image-alternative-text="date">
                    <span>{{ dateTimeString }}</span>
                </RowWithImageIcon>
                <RowWithImageIcon image-source="/src/assets/location-pin-icon.png" image-alternative-text="location">
                    <span>{{ getActivity.city }}, {{ getActivity.venue }}</span>
                </RowWithImageIcon>
                <RowWithImageIcon image-source="/src/assets/info-icon.png" image-alternative-text="info">
                    <span>{{ getActivity.description }}</span>
                </RowWithImageIcon>
            </div>
            <div class="detail-chat card">
                <ActivityChat />
            </div>
        </div>
        <div class="grid-column">
            <div class="attenders card">
                <h3>Attenders</h3>
                <AttendersList :attenders="['fdas']" />
            </div>
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
import AttendersList from './attenders/AttendersList.vue';


const activityStore = useActivityStore();

const { getActivity } = storeToRefs(activityStore);

const dateTimeString: ComputedRef<string> = computed(() => {
    const d: Date = new Date(getActivity.value?.beginDate ?? 0);
    return DateTimeToCzechFormat(d);
});

const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${getActivity.value?.category}.jpg`;
});

const getHost: ComputedRef<string> = computed(() => {
    return 'Petr';
});


const handleCancelAttendance = () => {

}

const handleJoinActivity = () => {

}

const handleEdit = () => {

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

.detail-header {
    padding: 0 0 15px 0;
}

.detail-content {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.detail-content>div {
    border-bottom: 2px solid #cccccc;
    padding-bottom: 8px;
}

.detail-content span {
    display: flex;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
}

.detail-chat {
    padding: 0 0 15px 0;
}

.attenders{
    padding: 0 0 15px 0;
}

.attenders>h3{
    width: 100%;
    text-align: center;
    color: var(--light-gold-color);
    background: var(--gradient-background);
    padding: 15px 0;
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
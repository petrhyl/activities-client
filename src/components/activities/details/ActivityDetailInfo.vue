<template>
    <div class="image-background" :style="{ backgroundImage: 'url(' + headerImageUrl + ')' }">
        <div class="main-info">
            <h1>{{ title }}</h1>
            <div class="date">{{ date }}</div>
            <div class="info-detail">
                <span>hosted by:</span>
                <span>{{ hostedBy }}</span>
            </div>
            <div class="info-detail">
                <span>category:</span>
                <span>{{ category }}</span>
            </div>
        </div>
    </div>
    <div class="header-buttons">
        <div class="user-actions">
            <StyledButton css-class="join" :button-type="ButtonTypes.BUTTON" @click-button="emits('join-activity')"
                :text="'Join Activity'" />
            <StyledButton css-class="cancel" :button-type="ButtonTypes.BUTTON" @click-button="emits('cancel-attendance')"
                :text="'Cancel Attendance'" />
        </div>
        <div class="edit-button">
            <StyledButton css-class="edit" :button-type="ButtonTypes.BUTTON" @click-button="emits('triger-edit')"
                :text="'Manage Event'" />
        </div>
    </div>
</template>


<script setup lang="ts">
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';


const props = defineProps<{
    headerImageUrl: string,
    title: string,
    date: string,
    hostedBy: string,
    category: string
}>();

const emits = defineEmits<{
    (e: 'join-activity'): void,
    (e: 'cancel-attendance'): void,
    (e: 'triger-edit'): void,
}>();

</script>


<style>
.image-background {
    position: relative;
    width: 100%;
    height: 35vh;
    background-size: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    margin-bottom: 15px;
}

.main-info {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #f5f5e5;
    background-color: #0e060691;
    top: 0;
    left: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding-left: 40px;
    padding-bottom: 20px;
    justify-content: end;
}

.main-info .date {
    font-family: 'Lucida Grande', Geneva, Verdana, sans-serif;
    margin-bottom: 15px;
}

.main-info .info-detail {
    display: flex;
    flex-direction: column;
    font-family: 'Lucida Sans', Geneva, Verdana, sans-serif;
    margin-bottom: 15px;
}

.main-info .info-detail span:first-child {
    font-size: 10pt;
    font-family: Cambria, 'Times New Roman', Times, serif;
    margin-bottom: 5px;
}

.header-buttons {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
}


.user-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

@media screen and (max-width: 1200px) {
    .header-buttons {
        flex-direction: column;
        row-gap: 15px;
        align-items: end;
    }

    .user-actions {
        width: 100%;
    }

    .edit-button {
        display: grid;
        width: calc(50% - 8px);
    }
}

@media screen and (max-width: 670px) {
    .edit-button {
        width: 100%;
    }

    .user-actions {
        display: flex;
        flex-direction: column;
    }
}
</style>

<style>
.user-actions .join {
    color: #2c2a2a;
    background-color: var(--sky-color);
}

.user-actions .cancel {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.user-actions .join:hover {
    background-color: #93d8ff;
}

.user-actions .cancel:hover {
    background-color: #a4b7c2;
}

.edit-button .edit {
    color: #2c2a2a;
    background-color: #ff8c4e;
}

.edit-button .edit:hover {
    color: #2c2a2a;
    background-color: #ff9b65;
}
</style>
<template>
    <CardLayout :use-padding="false">
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
            <template v-if="isCurrentUserLoggedIn">
                <div v-if="isHostedByCurrentUser" class="user-actions">
                    <StyledButton
                        css-class="user-action-button edit"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="emits('triger-edit')"
                        :text="'Manage Event'" />
                </div>
                <div v-else class="user-actions">
                    <StyledButton
                        v-if="isJoinedByCurrentUser"
                        css-class="user-action-button cancel"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="emits('cancel-attendance')"
                        :text="'Cancel Attendance'" />
                    <StyledButton
                        v-else
                        css-class="user-action-button join"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="emits('join-activity')"
                        :text="'Join Activity'" />
                </div>
            </template>
            <div v-else class="unlogged-user-message">
                Go to 'Log In' if you want to join this activity.
            </div>
        </div>
    </CardLayout>
</template>


<script setup lang="ts">
import CardLayout from '@/components/layout/base/CardLayout.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';


const props = defineProps<{
    headerImageUrl: string,
    title: string,
    date: string,
    hostedBy: string,
    category: string,
    isHostedByCurrentUser: boolean,
    isJoinedByCurrentUser: boolean,
    isCurrentUserLoggedIn: boolean
}>();

const emits = defineEmits<{
    (e: 'join-activity'): void,
    (e: 'cancel-attendance'): void,
    (e: 'triger-edit'): void,
}>();

</script>



<style>
.user-actions {
    width: 100%;
    display: flex;
    justify-content: end;
}

.user-action-button {
    width: 50%;
}

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

.user-actions .edit {
    color: #2c2a2a;
    background-color: #ff8c4e;
}

.user-actions .edit:hover {
    color: #2c2a2a;
    background-color: #ff9b65;
}

@media screen and (max-width: 670px) {
    .user-actions {
        display: flex;
        flex-direction: column;
    }
}
</style>


<style scoped>
.image-background {
    position: relative;
    width: 100%;
    height: 35vh;
    background-size: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
}

.main-info {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #0e060691;
    top: 0;
    left: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding-left: 40px;
    padding-bottom: 20px;
    justify-content: end;
}

.main-info h1,
.main-info span,
.main-info div {
    color: #f5f5e5;
}

.main-info .date {
    font-family: 'Lucida Grande', Geneva, Verdana, sans-serif;
    margin-bottom: 15px;
}

.main-info .info-detail {
    display: flex;
    flex-direction: column;
    font-family: 'Lucida Sans', Geneva, Verdana, sans-serif;
    margin-bottom: 10px;
}

.main-info .info-detail span:first-child {
    font-size: 10pt;
    font-family: Cambria, 'Times New Roman', Times, serif;
    margin-bottom: 5px;
}

.header-buttons {
    display: flex;
    justify-content: end;
    padding: 15px;
}

.unlogged-user-message {
    font-family: 'Gill Sans', Calibri, sans-serif;
    font-weight: 600;
    font-size: 13pt;
    color: var(--dark-blue-color);
}
</style>


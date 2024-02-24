<template>
    <CardLayout :use-padding="false">
        <div class="image-background" :style="{ backgroundImage: 'url(' + headerImageUrl + ')' }">
        <div v-if="isCancelled" class="main-info-flag">Canceled</div>
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
                        :css-class="buttonToggleCancelCss"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="handleToggleCancelActivity"
                        :text="buttonToggleCancelText"
                        :is-disabled="areManageButtonsDisabled" />
                    <StyledButton
                        v-if="!isCancelled"
                        css-class="user-action-button edit"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="handleEditActivity"
                        :text="'Manage Event'"
                        :is-disabled="areManageButtonsDisabled" />
                </div>
                <div v-else class="user-actions">
                    <StyledButton
                        v-if="isJoinedByCurrentUser"
                        css-class="user-action-button cancel"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="handleCancelAttendance"
                        :text="'Cancel Attendance'"
                        :is-disabled="areManageButtonsDisabled" />
                    <StyledButton
                        v-else
                        css-class="user-action-button join"
                        :button-type="ButtonTypes.BUTTON"
                        @click-button="handleJoinActivity"
                        :text="'Join Activity'"
                        :is-disabled="areManageButtonsDisabled" />
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
import { ref, watch, type Ref, type ComputedRef, computed } from 'vue';


const props = defineProps<{
    headerImageUrl: string,
    title: string,
    date: string,
    hostedBy: string,
    category: string,
    isCancelled: boolean,
    isHostedByCurrentUser: boolean,
    isJoinedByCurrentUser: boolean,
    isCurrentUserLoggedIn: boolean,
    areManageButtonsDisabled: boolean
}>();

const emits = defineEmits<{
    (e: 'join-activity'): void,
    (e: 'cancel-attendance'): void,
    (e: 'triger-edit'): void,
    (e: 'toggle-cancel-activity'): void
}>();


const areManageButtonsDisabled: Ref<boolean> = ref(props.areManageButtonsDisabled)

const buttonToggleCancelText: ComputedRef<string> = computed(() => {
    return props.isCancelled ? 'Re-active Activity' : 'Cancel Activity'
})

const buttonToggleCancelCss: ComputedRef<string> = computed(() => {
    return 'user-action-button' + (props.isCancelled ? ' reactive' : ' cancel')
})

const handleJoinActivity = () => {
    areManageButtonsDisabled.value = true
    emits('join-activity')
}

const handleCancelAttendance = () => {
    areManageButtonsDisabled.value = true
    emits('cancel-attendance')
}

const handleEditActivity = () => {
    areManageButtonsDisabled.value = true
    emits('triger-edit')
}

const handleToggleCancelActivity = () => {
    areManageButtonsDisabled.value = true
    emits('toggle-cancel-activity')
}

watch(props, () => {
    areManageButtonsDisabled.value = props.areManageButtonsDisabled
})

</script>



<style>
.user-actions {
    width: 100%;
    display: flex;
    justify-content: end;
    column-gap: 2%;
}

.user-action-button {
    width: 49%;
}

.user-actions .reactive,
.user-actions .join {
    color: var(--dark-blue-color);
    background-color: var(--azure-color);
}

.user-actions .cancel {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.user-actions .reactive:hover,
.user-actions .join:hover {
    filter: brightness(1.3);
}

.user-actions .cancel:hover {
    background-color: #a4b7c2;
}

.user-actions .edit {
    color: #2c2a2a;
    background-color: #ff8c4e;
}

.user-actions .edit:hover {
    filter: brightness(1.3);
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
}

.main-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #0e060691;
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
    font-family: 'Gill Sans', Calibri, sans-serif;
    font-size: 13pt;
    margin-bottom: 10px;
}

.main-info .info-detail span:first-child {
    font-size: 10pt;
    font-family: Cambria, 'Times New Roman', Times, serif;
    margin-bottom: 5px;
}

.main-info-flag{
    position: absolute;
    top: 5%;
    left: -2px;
    color: #e5e5e5;
    background-color: var(--warning-color);
    padding: 2px 7px;
    z-index: 10;
}

.main-info-flag::before{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 7px;
    background-color: var(--warning-color);
    transform-origin: top;
    transform: skewX(-15deg);
}

.main-info-flag::after{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 7px;
    background-color: var(--warning-color);
    transform-origin: bottom;
    transform: skewX(-15deg);
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


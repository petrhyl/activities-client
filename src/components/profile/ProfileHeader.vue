<template>
    <div class="profile-header">
        <div class="user-displaying">
            <ImageComponent
                css-clases="user-image"
                :image-url="userImageUrl"
                alternative-image-text="profile-image"
                :use-alternative-element="true">
                <img src="@/assets/user.png" alt="profile-image" />
            </ImageComponent>
            <h1 class="display-name">{{ displayedName }}</h1>
        </div>
        <div class="user-following">
            <div class="user-following-content">
                <div class="following-numbers">
                    <div class="user-followers">
                        <span class="amount">{{ followersCount }}</span>
                        <span class="title">Followers</span>
                    </div>
                    <div class="user-following">
                        <span class="amount">{{ followingsCount }}</span>
                        <span class="title">Following</span>
                    </div>
                </div>
                <div v-if="isFollowingButtonVisible" class="follow-button-section">
                    <StyledButton
                        :css-class="getFollowButtonCss"
                        :button-type="ButtonTypes.BUTTON"
                        :text="getFollowButtonText"
                        :is-disabled="isButtonDisabled"
                        @click-button="emits('toggle-follow')" />
                </div>
                <div v-if="isFollowing" class="following-indicator">
                    <span>Following</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { watch, type ComputedRef, computed, type Ref, ref } from 'vue';


const props = defineProps<{
    userImageUrl: string | null,
    displayedName: string,
    isFollowing: boolean,
    followersCount: number,
    followingsCount: number,
    isFollowingButtonVisible: boolean
    isUpdating: boolean
}>()

const emits = defineEmits<{
    (e: 'toggle-follow'): void
}>()


const isButtonDisabled: Ref<boolean> = ref(props.isUpdating)
const getFollowButtonText: ComputedRef<string> = computed(() => props.isFollowing ? 'Unfollow' : 'Follow')
const getFollowButtonCss: ComputedRef<string> = computed(() => props.isFollowing ? 'cancel-btn' : 'confirm-btn')

watch(props, () => {
    isButtonDisabled.value = props.isUpdating
})

</script>


<style scoped>
.profile-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}

.user-displaying {
    display: grid;
    grid-template-columns: 1fr 1.7fr;
    column-gap: 25px;
}

.user-displaying .display-name {
    display: flex;
    align-items: center;
    font-family: Tahoma, Geneva, Verdana, sans-serif;
}

.user-following {
    display: flex;
    justify-content: end;
}

.user-following-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
    --btn-width: calc(100% - 20px);
}

.following-numbers {
    display: flex;
    column-gap: 25px;
    border-bottom: 2px solid var(--light-gray-color);
    padding: 5px 15px 15px 15px;
}

.following-numbers .amount {
    font-size: 22pt;
    font-family: 'Arial', sans-serif;
}

.following-numbers .title {
    font-size: 11pt;
    font-family: 'Arial Narrow', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
}

.following-numbers>div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-displaying:deep() .user-image img {
    width: 100%;
}

.user-displaying:deep() .user-image {
    display: flex;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
}

.follow-button-section {
    width: var(--btn-width);
}

.follow-button-section:deep() .cancel-btn,
.follow-button-section:deep() .confirm-btn {
    width: 100%;
}

.following-indicator {
    width: var(--btn-width);
    text-align: center;
    border: 1px solid #00e9b2;
    border-radius: 5px;
    padding: 3px 12px;
}

.following-indicator>span {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #00e9b2;
}
</style>


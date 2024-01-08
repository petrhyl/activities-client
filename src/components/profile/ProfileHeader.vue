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
                        <span class="amount">2500</span>
                        <span class="title">Followers</span>
                    </div>
                    <div class="user-following">
                        <span class="amount">250</span>
                        <span class="title">Following</span>
                    </div>
                </div>
                <div class="follow-button-section">
                    <StyledButton
                        :css-class="'follow-button'"
                        :button-type="ButtonTypes.BUTTON"
                        :text="followButtonText"
                        @click-button="" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { ref, type Ref, watch, render } from 'vue';


const props = defineProps<{
    userImageUrl: string | null,
    displayedName: string
}>()


const followButtonText: Ref<string> = ref('Follow')


const handleFollow = ()=>{
    
}

watch(props,()=>{

})

</script>


<style>
.follow-button {
    color: var(--dark-blue-color);
    background-color: var(--azure-color);
    width: 100%;
}

.follow-button:hover{
    filter: brightness(1.3);
}

.user-image img {
    width: 100%;
}

.user-image {
    display: flex;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
}
</style>

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
}

.following-numbers {
    display: flex;
    column-gap: 25px;
    border-bottom: 2px solid var(--light-gray-color);
    padding: 5px 15px 15px 15px;
    margin-bottom: 15px;
}

.following-numbers .amount {
    font-size: 26pt;
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
</style>

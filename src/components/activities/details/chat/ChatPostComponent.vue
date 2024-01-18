<template>
    <div class="chat-contribution">
        <div class="image-container">
            <ImageComponent
                css-clases="contributor-image"
                :image-url="chatPost.userImage"
                alternative-image-text="contributor"
                :use-alternative-element="true">
                <img src="@/assets/user.png" alt="attender" />
            </ImageComponent>
        </div>
        <div class="contribution-header">
            <div>
                <span class="name">{{ chatPost.displayName }}</span>
                <span class="date">{{ DateTimeToCzechFormat(chatPost.createdAt) }}</span>
            </div>
        </div>
        <div class="contribution-content">
            {{ chatPost.content }}
        </div>
    </div>
</template>


<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import type { ChatPost } from '@/models/Activity';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';


const props = defineProps<{
    chatPost: ChatPost
}>();

const emits = defineEmits<{
    (e: 'on-reply', postId: number): void
}>();
</script>


<style scoped>
.chat-contribution {
    display: grid;
    grid-template-areas:
        'm h'
        '. c';
    grid-template-columns: 40px auto;
    grid-template-rows: auto auto;
    column-gap: 20px;
    row-gap: 3px;
}

.image-container {
    width: 40px;
    grid-area: m;
}

.image-container:deep() .contributor-image img {
    width: 100%;
    border-radius: 50%;
}

.contribution-header {
    grid-area: h;
    display: flex;
    align-items: start;
    gap: 20px;
    padding-top: 5px;
}

.contribution-header>div{
    display: inline-flex;
    gap: 20px;
}

.contribution-header .name{
    display: flex;
    font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 13pt;
    font-weight: 600;
}

.contribution-header .date{
    display: flex;
    align-items: end;
    font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.contribution-content {
    grid-area: c;
    font-family: Calibri, sans-serif;
    white-space: pre-wrap;
}
</style>
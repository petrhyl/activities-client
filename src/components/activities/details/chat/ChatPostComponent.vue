<template>
    <div class="chat-contribution">
        <ImageComponent
            css-clases="contributor-image"
            :image-url="chatPost.UserImage"
            alternative-image-text="contributor"
            :use-alternative-element="true">
            <img src="@/assets/user.png" alt="attender" />
        </ImageComponent>
        <div class="contribution-content">
            <div>
                <span>{{ chatPost.displayName }}</span>
                <span>{{ DateTimeToCzechFormat(chatPost.createdAt) }}</span>
            </div>
            <div>
                {{ chatPost.content }}
            </div>
            <button @click="emits('on-reply', chatPost.id)">Reply</button>
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
}
</style>
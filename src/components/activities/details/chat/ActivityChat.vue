<template>
    <CardLayout :header-text="'Chat about this event'" :use-padding="false">
        <div class="chat-content">
            <ul class="contributions" v-for="post in chatPosts">
                <li>
                    <ContributionComponent :chat-post="post" />
                </li>
            </ul>
            <div class="write-post">
                <FormLayout form-styles="post-form" :on-submit-form="handleSubmit" :invalid-message="invalidMessage">
                    <FormComponent :label-text="''" :label-for="''" :warning-message="''">
                        <textarea class="form-input-element" rows="7"></textarea>
                    </FormComponent>
                    <StyledButton :css-class="'button-add'" :button-type="ButtonTypes.SUBMIT" :text="'Add Reply'"
                        @click-button="handleSubmit" />
                </FormLayout>
            </div>
        </div>
    </CardLayout>
</template>


<script setup lang="ts">
import FormLayout from '@/components/layout/form/FormLayout.vue';
import ContributionComponent from '@/components/activities/details/chat/ChatPostComponent.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { ref, watch, type Ref, onBeforeMount, onUnmounted } from 'vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';
import FormComponent from '@/components/layout/form/FormComponent.vue';
import { useChatStore } from "@/stores/chat";
import { storeToRefs } from 'pinia';
import type { ChatPost } from '@/models/Activity';
import { useRoute } from 'vue-router';


const emits = defineEmits<{
    (e: 'add-chat-post'): void
}>()

const route = useRoute()
const chatStore = useChatStore()

const { getChatPosts } = storeToRefs(chatStore)
const chatPosts: Ref<ChatPost[]> = ref(getChatPosts.value)
const invalidMessage: Ref<string> = ref('');


const handleSubmit = () => {

}

watch(getChatPosts, () => chatPosts.value = getChatPosts.value)

onBeforeMount(()=>{
    // const activityId = route.params['activityId'] as string
    // chatStore.createHubConnection(activityId)    
    chatPosts.value = getChatPosts.value
})

onUnmounted(()=>{
    chatStore.clearChatPosts()
})

</script>


<style scoped>
ul.contributions {
    list-style: none;
    padding: 0;
    margin: 15px;
}

.write-post textarea {
    resize: none;
}

.write-post:deep() .button-add {
    background-color: var(--sky-color);
    width: fit-content;
    transition: all 180ms;
}

.write-post:deep() .button-add:hover {
    color: #e6f4ff;
    background-color: #56baf4;
}

.write-post:deep() .post-form{
    align-items: end;
}
</style>

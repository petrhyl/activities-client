<template>
    <CardLayout :header-text="'Chat about this event'" :use-padding="false">
        <div class="chat-content">
            <div class="write-post-container">
                <ResponseMessage v-if="invalidMessage !== ''" :is-error="true" :message="invalidMessage" />
                <div class="write-post">
                    <div
                        v-if="!isCanceled && isUserLoggedIn"
                        class="text-input-container"
                        @focusout="handleBlurInput">
                        <textarea
                            id="chat-post-text"
                            class="form-input-element"
                            :rows="newMessageRows"
                            v-model="textContent"
                            @focus="handleFocusInput"
                            @keydown="handleInputKeyDown">
                    </textarea>
                        <div @mousedown="handleClickSend" class="button-container">
                            <StyledButton
                                :css-class="'button-add'"
                                :button-type="ButtonTypes.SUBMIT"
                                :text="'Add Reply'"
                                :is-font-smaller="true"
                                :is-disabled="isSubmiting" />
                        </div>
                    </div>
                    <div class="unlogged-text" v-else-if="!isUserLoggedIn">
                        Please, log in for adding a post.
                    </div>
                    <div v-else class="cancel-text">
                        This activity is canceled.
                    </div>
                </div>
            </div>
            <ul class="contributions" v-for="post in chatPosts">
                <li>
                    <ChatPostComponent :chat-post="post" />
                </li>
            </ul>
        </div>
    </CardLayout>
</template>


<script setup lang="ts">
import ChatPostComponent from '@/components/activities/details/chat/ChatPostComponent.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { ref, watch, type Ref, onBeforeMount, onUnmounted } from 'vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';
import { useChatStore } from "@/stores/chat";
import { storeToRefs } from 'pinia';
import type { ChatPost } from '@/models/Activity';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';


const props = defineProps<{
    isCanceled: boolean,
    activityId: string,
    isUserLoggedIn: boolean
}>()

const emits = defineEmits<{
    (e: 'add-chat-post'): void
}>()


const messageInputRowNumber = 1

const chatStore = useChatStore()

const { getChatPosts } = storeToRefs(chatStore)
const chatPosts: Ref<ChatPost[]> = ref(getChatPosts.value)
const invalidMessage: Ref<string> = ref('');
const textContent: Ref<string> = ref('')
const isSubmiting: Ref<boolean> = ref(false)
const newMessageRows: Ref<number> = ref(messageInputRowNumber)


const handleInputKeyDown = (ev: KeyboardEvent) => {
    invalidMessage.value = ''

    if (!ev.shiftKey && ev.key.toLowerCase() === 'enter') {
        ev.preventDefault()
        handleSubmit()
    }
}

const handleClickSend = async (ev: MouseEvent) => {
    ev.stopPropagation()
    await handleSubmit()
    handleBlurInput()
}

const handleFocusInput = () => {
    newMessageRows.value = 5
}

const handleBlurInput = () => {
    newMessageRows.value = messageInputRowNumber
}

const handleSubmit = async () => {
    await sendOrWriteMessage()
    isSubmiting.value = false
}

const sendOrWriteMessage = async () => {
    isSubmiting.value = true;

    if (!textContent.value || textContent.value.trim() === '') {

        return
    }

    const response = await chatStore.addChatPost({
        activityId: props.activityId,
        content: textContent.value
    })

    if (!response.isSuccessful) {
        invalidMessage.value = response.errorMessage!

        return
    }

    textContent.value = ''
}

watch(getChatPosts, () => {
    chatPosts.value = getChatPosts.value
})

onBeforeMount(() => {
    if (props.isUserLoggedIn) {
        chatStore.createHubConnection(props.activityId)
        chatPosts.value = getChatPosts.value
    }
})

onUnmounted(() => {
    chatStore.clearChatPosts()
})

</script>


<style scoped>
.write-post-container{
    padding: 15px 15px 20px 15px;
}
ul.contributions {
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 0;
    padding: 0 15px 10px 15px;
}

.contributions li {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--light-gray-color);
}

.text-input-container {
    width: 100%;
    position: relative;
    display: flex;
}

.write-post textarea {
    resize: none;
    transition: all 180ms ease-out;
}

.button-container {
    position: absolute;
    bottom: 0px;
    right: 4px;
    outline: 1px solid var(--sky-color);
    outline-offset: -5px;
    border-radius: 9px;
    transition: all 180ms;
}

.write-post:deep() .button-add {
    color: var(--sky-color);
    background-color: transparent;
    transition: all 180ms;
}

.write-post:deep() .button-container:hover {
    filter: brightness(1.2);
    text-shadow: 0 0 2px var(--sky-color);
}

.write-post:deep() .post-form {
    align-items: end;
}

.cancel-text,
.unlogged-text {
    font-size: 13pt;
    text-align: center;
    width: 100%;
}

.cancel-text {
    font-family: 'Times New Roman', Times, serif;
    color: var(--warning-color);
}

.unlogged-text {
    font-family: 'Gill Sans', Calibri, sans-serif;
    font-weight: 600;
    color: var(--dark-blue-color);
}
</style>

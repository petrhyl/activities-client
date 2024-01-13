import type { ChatPost, ChatPostRequest } from "@/models/Activity";
import { ApiEndpoints } from "@/utils/constanses/ApiEndpoints";
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { defineStore } from "pinia";
import { ref, type ComputedRef, type Ref, computed } from "vue";
import { useUserStore } from "../user";
import type { FetchResponse } from "@/models/auxillary/interfaces";

export const useChatStore = defineStore('chatStore', () => {
    const chatPosts: Ref<ChatPost[]> = ref([])
    const hubConnection: Ref<HubConnection | null> = ref(null)

    const userStore = useUserStore()

    const getChatPosts: ComputedRef<ChatPost[]> = computed(() => chatPosts.value)

    const createHubConnection = (activityId: string) => {
        hubConnection.value = new HubConnectionBuilder()
            .withUrl(`https://localhost:5000/chat?activityId=${activityId}`, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                accessTokenFactory() {
                    return userStore.getCurrentUserToken!
                }
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

        hubConnection.value.start().catch(err => console.log('Error during establishing hub connection: ', err))

        hubConnection.value.on('LoadChatPosts', (posts: ChatPost[]) => {
            chatPosts.value = posts
        })

        hubConnection.value.on('ReceiveChatPosts', (post: ChatPost) => {
            chatPosts.value.push(post)
        })
    }

    const stopHubConnection = () => {
        hubConnection.value?.stop().catch(err => console.log('Error while stopping hub connection. ', err))
    }

    const clearChatPosts = () => {
        chatPosts.value = []
        stopHubConnection()
    }

    const addChatPost = async (post: ChatPostRequest):Promise<FetchResponse> =>{
        try {
            await hubConnection.value?.invoke('SendChatPost', post)
        } catch (error) {
            let errMsg = null
            if (error instanceof Error) {
                errMsg = error.message
            }

            return {
                isSuccessful: false,
                errorMessage: errMsg ? errMsg : 'Failed to send new post.'
            }
        }

        return{
            isSuccessful: true,
            errorMessage: null
        }
    }

    return {
        getChatPosts,
        createHubConnection,
        clearChatPosts
    }
}) 
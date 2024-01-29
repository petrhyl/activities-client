import type { ChatPost, ChatPostRequest } from "@/models/Activity";
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { defineStore } from "pinia";
import { ref, type ComputedRef, type Ref, computed } from "vue";
import { useUserStore } from "../user";
import type { FetchResponse } from "@/models/auxillary/interfaces";
import { ChatPostObject } from "@/utils/objects/auxillary";

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
                    return userStore.getCurrentUserTokenWithoutBearer!
                }
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

        hubConnection.value.start().catch(err => console.log('Error during establishing hub connection: ', err))

        hubConnection.value.on('LoadChatPosts', (posts: ChatPost[]) => {
            chatPosts.value = posts
        })

        hubConnection.value.on('ReceiveChatPost', (post: ChatPost | any) => {
            if (!(post !== typeof ChatPostObject)) {
                console.log('Could not save a post.')

                return
            }
            chatPosts.value.unshift(post)
        })
    }

    const stopHubConnection = () => {
        if (hubConnection.value?.state === HubConnectionState.Disconnected
            || hubConnection.value?.state === HubConnectionState.Disconnecting) {
            return
        }
        console.log('disconecting');
        
        hubConnection.value?.stop().catch(err => console.log('Error while stopping hub connection. ', err))
    }

    const clearChatPosts = () => {
        chatPosts.value = []
        stopHubConnection()
    }

    const addChatPost = async (post: ChatPostRequest): Promise<FetchResponse> => {
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

        return {
            isSuccessful: true,
            errorMessage: null
        }
    }

    return {
        getChatPosts,
        createHubConnection,
        clearChatPosts,
        addChatPost
    }
}) 
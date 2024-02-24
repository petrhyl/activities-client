<template>
    <div class="user-followings">
        <div class="header">
            <h3 class="title">{{ listTitle }}</h3>
            <ResponseMessage
                v-if="changeListWarningMessage !== ''"
                :is-error="true"
                :message="changeListWarningMessage" />
        </div>
        <LoadingLayer :is-loading="isLoading" :error-message="warningMessage">
            <FollowingList
                :followings="followings"
                @remove-follower="handleRemoveFollower"
                @follow="handleFollowUnfollow"
                @unfollow="handleFollowUnfollow" />
        </LoadingLayer>
    </div>
</template>
    
    
<script setup lang="ts">
import FollowingList from "@/components/profile/details/followings/FollowingList.vue";
import LoadingLayer from '@/components/layout/base/LoadingLayer.vue';
import { type Ref, ref, onBeforeMount } from 'vue';
import type { Profile } from "@/models/User";
import { useProfileStore } from "@/stores/profile";
import { ScrollPageToTop } from "@/utils/stateUndependentFunctions";
import ResponseMessage from "@/components/layout/base/ResponseMessage.vue";


const props = defineProps<{
    apiEndpoint: string,
    listTitle: string
}>()


const profileStore = useProfileStore()

const warningMessage: Ref<string> = ref('')
const changeListWarningMessage: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(true)
const followings: Ref<Profile[]> = ref([])


const handleRemoveFollower = async (username: string) => {
    const response = await profileStore.removeFollower(username)

    if (!response.isSuccessful) {
        changeListWarningMessage.value = response.errorMessage!
        ScrollPageToTop()

        return
    }

    changeListWarningMessage.value = ''
    await retrieveFollowings()
}

const handleFollowUnfollow = async (username: string) => {
    const response = await profileStore.toggleFollowing(username)

    if (!response.isSuccessful) {
        changeListWarningMessage.value = response.errorMessage!
        ScrollPageToTop()

        return
    }

    changeListWarningMessage.value = ''
    await retrieveFollowings()
}


const retrieveFollowings = async () => {
    isLoading.value = true

    const response = await profileStore.loadFollowings(props.apiEndpoint)

    if (response.isSuccessful) {
        followings.value = response.data!
    } else {
        warningMessage.value = response.errorMessage!
    }

    isLoading.value = false
}

onBeforeMount(() => {
    retrieveFollowings()
})
</script>
    
    
<style scoped>
.header {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-bottom: 15px;
    font-family: 'Gill Sans', Calibri, sans-serif;
}
</style>
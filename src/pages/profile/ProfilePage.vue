<template>
    <PageContainer>
        <div class="header-content">
            <CardLayout :use-padding="true">
                <ResponseMessage v-if="errorMesage" :is-error="true" :message="errorMesage" />
                <ProfileHeader
                    v-if="getCurrentProfile"
                    :displayed-name="displayedName"
                    :user-image-url="imageUrl"
                    :is-following-button-visible="isFollowingButtonVisible"
                    :is-following="isFollowing"
                    :followers-count="followersCount"
                    :followings-count="followingsCount"
                    :is-updating="isLoading"
                    @toggle-follow="handleToggleFollow" />
            </CardLayout>
        </div>
        <div class="body-content">
            <div class="grid-item-container">
                <CardLayout :use-padding="false">
                    <ProfileMenu />
                </CardLayout>
            </div>
            <div class="grid-item-container">
                <CardLayout :key="subRouteChangeKey" :use-padding="true">
                    <RouterView />
                </CardLayout>
            </div>
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import { useProfileStore } from '@/stores/profile';
import { onBeforeMount, ref, watch, type Ref, type ComputedRef, computed } from 'vue';
import ProfileMenu from '@/components/profile/ProfileMenu.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';


const props = defineProps<{
    username: string
}>()


const profileStore = useProfileStore()

const { isLoggedIn, getCurrentUsername } = storeToRefs(useUserStore())
const { getCurrentProfile } = storeToRefs(profileStore)
const displayedName: Ref<string> = ref(getCurrentProfile.value?.displayName ?? '')
const imageUrl: Ref<string> = ref(getCurrentProfile.value?.imageUrl ?? '')
const isFollowing: Ref<boolean> = ref(getCurrentProfile.value?.isCurrentUserFollowing ?? false)
const followersCount: Ref<number> = ref(getCurrentProfile.value?.followersCount ?? 0)
const followingsCount: Ref<number> = ref(getCurrentProfile.value?.followingsCount ?? 0)
const isLoading: Ref<boolean> = ref(true)
const errorMesage: Ref<string | null> = ref(null)
const isFollowingButtonVisible: ComputedRef<boolean> = computed(() =>
    isLoggedIn.value && getCurrentUsername.value !== props.username)
const subRouteChangeKey: Ref<string> = ref('s')

const loadProfile = async () => {
    const profileResponse = await profileStore.loadUserProfile(props.username)

    if (!profileResponse.isSuccessful) {
        errorMesage.value = profileResponse.errorMessage
    }

    isLoading.value = false
}


const handleToggleFollow = async () => {
    if (!isLoggedIn.value) {
        return
    }

    isLoading.value = true

    const response = await profileStore.toggleFollowing(props.username)

    if (!response.isSuccessful) {
        errorMesage.value = response.errorMessage

        return
    }

    await loadProfile()
}


onBeforeMount(async () => {
    loadProfile()
})

watch([getCurrentProfile, isLoggedIn], () => {
    imageUrl.value = getCurrentProfile.value?.imageUrl ?? ''
    displayedName.value = getCurrentProfile.value?.displayName ?? ''
    isFollowing.value = getCurrentProfile.value?.isCurrentUserFollowing ?? false
    followersCount.value = getCurrentProfile.value?.followersCount ?? 0
    followingsCount.value = getCurrentProfile.value?.followingsCount ?? 0
})

watch(props, () => {
    loadProfile()
    subRouteChangeKey.value += '1'
})

</script>


<style scoped>
.header-content {
    margin-bottom: 15px;
}

.body-content {
    display: grid;
    grid-template-columns: 1fr 6fr;
    column-gap: 20px;
}
</style>
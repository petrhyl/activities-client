<template>
    <PageContainer>
        <div class="header-content">
            <CardLayout :use-padding="true">
                <ResponseMessage v-if="errorMesage" :is-error="true" :message="errorMesage" />
                <ProfileHeader
                    v-if="getCurrentProfile"
                    :displayed-name="getCurrentProfile.displayName"
                    :user-image-url="getCurrentProfile.imageUrl" />
            </CardLayout>
        </div>
        <div class="body-content">
            <CardLayout :use-padding="false">
                <ProfileMenu />
            </CardLayout>
            <CardLayout :use-padding="true">
                <RouterView />
            </CardLayout>
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import ResponseMessage from '@/components/layout/ResponseMessage.vue';
import PageContainer from '@/components/layout/base/PageContainer.vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import { useProfileStore } from '@/stores/profile';
import { onBeforeMount, ref, type Ref } from 'vue';
import ProfileMenu from './ProfileMenu.vue';
import { storeToRefs } from 'pinia';


const props = defineProps<{
    username: string
}>()


const profileStore = useProfileStore()

const { getCurrentProfile } = storeToRefs(profileStore)
const errorMesage: Ref<string | null> = ref(null)


onBeforeMount(async () => {
    const profileResponse = await profileStore.loadUserProfile(props.username)

    if (!profileResponse.isSuccessful) {
        errorMesage.value = profileResponse.errorMessage
    }
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
<template>
    <div class="user-about">
        <div class="controls">
            <div>
                <ResponseMessage v-if="warningMessage !== ''" :is-error="true" :message="warningMessage" />
            </div>
        </div>
        <AboutComponent
            :content="aboutBio"
            :displayed-name="aboutDisplayedName"
            :is-editing="isEditing"
            :is-uploading="isUploading"
            :is-current-user="getCurrentUsername === getCurrentProfile?.username"
            @start-edit="handleEdit"
            @confirm-edit="handleSave" />
    </div>
</template>


<script setup lang="ts">
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import { watch, type Ref, ref } from 'vue';
import AboutComponent from "@/components/profile/details/about/AboutComponent.vue";
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import type { AboutSection } from '@/models/User';
import { useUserStore } from '@/stores/user';


const {getCurrentUsername} = storeToRefs(useUserStore())
const userProfileStore = useProfileStore()
const { getCurrentAboutSection, getCurrentProfile } = storeToRefs(userProfileStore)

const aboutBio: Ref<string> = ref(getCurrentAboutSection.value.bio)
const aboutDisplayedName: Ref<string> = ref(getCurrentAboutSection.value.displayName)
const isEditing: Ref<boolean> = ref(false)
const isUploading: Ref<boolean> = ref(false)
const warningMessage: Ref<string> = ref('')


const handleEdit = () => {
    isEditing.value = !isEditing.value
}

const handleSave = async (aboutProfile: AboutSection) => {
    isUploading.value = true
    await saveEditedProfile(aboutProfile)
    await loadProfile()
}

const saveEditedProfile =async (aboutProfile: AboutSection) => {
    const response = await userProfileStore.editUserProfile(aboutProfile)
    
    if (!response.isSuccessful) {
        warningMessage.value = response.errorMessage!
    }
    
    isEditing.value = false
}

const loadProfile = async () =>{
    const response = await userProfileStore.loadUserProfile(userProfileStore.getCurrentProfile?.username!)

    if (!response.isSuccessful) {
        warningMessage.value = response.errorMessage!
    }

    isUploading.value = false
}

watch(getCurrentAboutSection, () => {
    aboutBio.value = getCurrentAboutSection.value.bio
    aboutDisplayedName.value = getCurrentAboutSection.value.displayName
})
</script>



<style scoped>

.controls {
    width: 100%;
    display: flex;
    justify-content: start;
}
</style>
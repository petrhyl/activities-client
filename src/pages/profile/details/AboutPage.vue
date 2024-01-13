<template>
    <div class="user-about">
        <div class="controls">
            <div>
                <ResponseMessage v-if="warningMessage !== ''" :is-error="true" :message="warningMessage" />
            </div>
            <StyledButton
                :button-type="ButtonTypes.BUTTON"
                :text="getEditButtonText"
                :css-class="getEditButtonCss"
                :is-disabled="isUploading"
                @click-button="handleEdit" />
        </div>
        <AboutComponent
            :content="aboutBio"
            :displayed-name="aboutDisplayedName"
            :is-editing="isEditing"
            :is-uploading="isUploading"
            @confirm-edit="handleSave" />
    </div>
</template>


<script setup lang="ts">
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import { watch, type Ref, ref, type ComputedRef, computed } from 'vue';
import AboutComponent from "@/components/profile/details/about/AboutComponent.vue";
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import type { AboutSection } from '@/models/User';


const userProfileStore = useProfileStore()
const { getCurrentAboutSection } = storeToRefs(userProfileStore)

const aboutBio: Ref<string> = ref(getCurrentAboutSection.value.bio)
const aboutDisplayedName: Ref<string> = ref(getCurrentAboutSection.value.displayName)
const isEditing: Ref<boolean> = ref(false)
const isUploading: Ref<boolean> = ref(false)
const warningMessage: Ref<string> = ref('')
const getEditButtonText: ComputedRef = computed(() => isEditing.value ? 'Cancel Edit' : 'Edit Informations')
const getEditButtonCss: ComputedRef = computed(() => isEditing.value ? 'cancel-edit-button' : 'edit-button')


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
.controls:deep() .edit-button {
    color: var(--dark-blue-color);
    background-color: var(--azure-color);
}

.controls:deep() .cancel-edit-button {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.controls:deep() input:hover {
    filter: brightness(1.2);
}
.controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
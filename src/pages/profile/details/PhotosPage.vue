<template>
    <div class="user-photos">
        <div class="photo-list-header">
            <h3>Photos</h3>
            <div class="add-photo-button-section">
                <StyledButton
                    v-if="profileStore.isProfileFromCurrentUser"
                    :css-class="getAddPhotoButtonCss"
                    :button-type="ButtonTypes.BUTTON"
                    :text="getAddPhotoButtonText"
                    @click-button="handleAddPhoto" />
            </div>
        </div>
        <AddPhotoSection v-if="isAddPhotoOpen" @upload-photo="handleUploadPhoto" />
        <LoadingLayer
            v-else
            :is-loading="photos.length === 0 && !isAddPhotoOpen"
            :error-message="errorMessage && photos.length > 0 ? errorMessage : ''">
            <PhotoList :photos="photos" @set-as-main="handleSetPhotoAsMain" @delete-photo="handleDeletePhoto" />
        </LoadingLayer>
        <TeleportedModal
            v-if="isSetMainModalOpened || isDeletePhotoModalOpen"
            :content="getModalText"
            @cancel-button="handleCancelModal"
            @click-background="handleCancelModal"
            @="{ confirmButton: isSetMainModalOpened ? handleConfirmSetMainPhoto : handleConfirmdeletePhoto }" />
    </div>
</template>


<script setup lang="ts">
import StyledButton from '@/components/layout/form/StyledButton.vue';
import AddPhotoSection from '@/components/profile/details/photos/AddPhotoSection.vue';
import PhotoList from '@/components/profile/details/photos/PhotoList.vue';
import type { PhotoImage } from '@/models/User';
import type { AddPhotoRequest, FetchResponse, ModalState } from '@/models/auxillary/interfaces';
import { keyProvidedModalState } from '@/models/auxillary/providedKey';
import { useProfileStore } from '@/stores/profile';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { ModalInState } from '@/utils/objects/ModalInState';
import { type Ref, ref, onBeforeMount, type ComputedRef, computed, inject } from 'vue';
import LoadingLayer from "@/components/layout/base/LoadingLayer.vue";
import TeleportedModal from '@/components/layout/TeleportedModal.vue';
import { ScrollPageToTop } from '@/utils/stateUndependentFunctions';


const props = defineProps<{
    username: string
}>()


const profileStore = useProfileStore()

const { setCloseModal } = inject<ModalState>(keyProvidedModalState, { modalInState: new ModalInState(), setOpenModal: () => { }, setCloseModal: () => { } })

const photos: Ref<PhotoImage[]> = ref([])
const isAddPhotoOpen: Ref<boolean> = ref(false)
const errorMessage: Ref<string | null> = ref(null)
const isSetMainModalOpened: Ref<boolean> = ref(false)
const isDeletePhotoModalOpen: Ref<boolean> = ref(false)
const processingPhotoId: Ref<string> = ref('')
const getAddPhotoButtonText: ComputedRef<string> = computed(() => {
    return isAddPhotoOpen.value ? 'Cancel Adding' : 'Add Photo'
})
const getAddPhotoButtonCss: ComputedRef<string> = computed(() => {
    return isAddPhotoOpen.value ? 'cancel-photo' : 'add-photo'
})
const getModalText: ComputedRef<string> = computed(() => {
    let text = 'Do you really want to'
    if (isSetMainModalOpened.value) {
        return text + ' set this photo as your profile image?'
    }
    return text + ' delete this photo?'
})

const handleAddPhoto = () => {
    isAddPhotoOpen.value = !isAddPhotoOpen.value
}

const handleUploadPhoto = async (photoFile: File) => {
    const request: AddPhotoRequest = {
        file: photoFile,
        isMain: false
    }

    const addPhotoResponse = await profileStore.addPhotoToProfile(request)
    resolveError(addPhotoResponse)

    await loadPhotos()

    isAddPhotoOpen.value = false
}

const handleSetPhotoAsMain = (photoId: string) => {
    processingPhotoId.value = photoId
    setCloseModal()
    isSetMainModalOpened.value = true
}

const handleDeletePhoto = (photoId: string) => {
    processingPhotoId.value = photoId
    setCloseModal()
    isDeletePhotoModalOpen.value = true
}

const handleCancelModal = () => {
    isSetMainModalOpened.value = false
    isDeletePhotoModalOpen.value = false
}

const handleConfirmSetMainPhoto = async () => {
    const response = await profileStore.setPhotoAsMain(processingPhotoId.value)
    resolveError(response)
    isSetMainModalOpened.value = false
    const profileResponse = await profileStore.loadUserProfile(profileStore.getCurrentProfile!.username)
    resolveError(profileResponse)
}

const handleConfirmdeletePhoto = async () => {
    const response = await profileStore.deletePhoto(processingPhotoId.value)
    resolveError(response)
    isDeletePhotoModalOpen.value = false
    loadPhotos()
}

const resolveError = (response: FetchResponse) => {
    if (!response.isSuccessful) {
        errorMessage.value = response.errorMessage
        ScrollPageToTop()
    }
}

const loadPhotos = async () => {
    const response = await profileStore.loadProfilePhotos(props.username)
    if (!response.isSuccessful) {
        errorMessage.value = response.errorMessage

        return
    }

    photos.value = response.data!
}


onBeforeMount(() => {
    loadPhotos()
})

</script>


<style>
.add-photo {
    color: var(--dark-blue-color);
    background-color: var(--azure-color);
    font-size: 11pt;
}

.cancel-photo {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.add-photo:hover,
.cancel-photo:hover {
    filter: brightness(1.2);
}
</style>


<style scoped>
.photo-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
</style>



<template>
    <div class="user-photos">
        <div class="photo-list-header">
            <h3>Photos</h3>
            <span v-if="errorMessage" class="warning">Something's happend. Photo could not be uploaded.</span>
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
        <PhotoList v-else :photos="photos" />
    </div>
</template>


<script setup lang="ts">
import StyledButton from '@/components/layout/form/StyledButton.vue';
import AddPhotoSection from '@/components/profile/details/AddPhotoSection.vue';
import PhotoList from '@/components/profile/details/PhotoList.vue';
import type { PhotoImage } from '@/models/User';
import type { AddPhotoRequest } from '@/models/auxillary/interfaces';
import { useProfileStore } from '@/stores/profile';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { type Ref, ref, onBeforeMount, type ComputedRef, computed } from 'vue';



const props = defineProps<{
    username: string
}>()


const profileStore = useProfileStore()

const photos: Ref<PhotoImage[]> = ref([])
const isAddPhotoOpen: Ref<boolean> = ref(false)
const errorMessage: Ref<string | null> = ref(null)
const getAddPhotoButtonText: ComputedRef<string> = computed(() => {
    return isAddPhotoOpen.value ? 'Cancel Adding' : 'Add Photo'
})
const getAddPhotoButtonCss: ComputedRef<string> = computed(() => {
    return isAddPhotoOpen.value ? 'cancel-photo' : 'add-photo'
})


const handleAddPhoto = () => {
    isAddPhotoOpen.value = !isAddPhotoOpen.value
}

const handleUploadPhoto = async (photoFile: File) => {
    isAddPhotoOpen.value = false

    const request: AddPhotoRequest = {
        file: photoFile,
        isMain: false
    }

    const addPhotoResponse = await profileStore.addPhotoToProfile(request)

    if (!addPhotoResponse.isSuccessful) {
        errorMessage.value = addPhotoResponse.errorMessage
    }
    
    loadPhotos()
}

const loadPhotos =async () => {
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

.cancel-photo:hover {
    background-color: #a4b7c2;
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



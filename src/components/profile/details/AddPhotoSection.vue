<template>
    <div class="add-photo-element">
        <DropZone
            v-if="!isPhotoAdded"
            :width="250"
            :height="250"
            :drop-prompt="'Drop here a photo'"
            :after-drop-promt="'Photo is here'"
            :file-warning="'You can insert only files:<br /> .jpg .jpeg .png'"
            :acceptable-file-extentions="['jpg', 'jpeg', 'png']"
            :acceptable-file-type="'image'"
            @insert-file="handleInsertFile"
            @remove-file="" />
        <PhotoCropper
            v-else
            :crop-prompt="'Adjust crop position'"
            :photo="photo!"
            :width="320"
            :height="350"
            :required-width="500"
            :required-height="500"
            @upload-photo="handleUploadPhoto" />
    </div>
</template>


<script setup lang="ts">
import DropZone from "@/components/layout/base/DropZone.vue";
import PhotoCropper from "@/components/layout/base/PhotoCropper.vue";
import { ref, type ComputedRef, type Ref, computed } from "vue";


const emits = defineEmits<{
    (e: 'uploadPhoto', photoFile: File): void
}>()


const photo: Ref<File | null> = ref(null)
const isPhotoAdded: Ref<boolean> = ref(false)


const handleInsertFile = (photoFile: File) => {
    photo.value = photoFile
    isPhotoAdded.value = true
}

const handleUploadPhoto = (photoFile: File)=>{
    emits('uploadPhoto', photoFile)
}
</script>


<style scoped>
.add-photo-element {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
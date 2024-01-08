<template>
    <div
        :class="getDropZoneCss"
        @dragenter.prevent="handleIsFileOver"
        @dragleave.prevent="handleIsFileOver"
        @dragover.prevent
        @drop.prevent="handleDropFile">
        <span v-if="isWarningVisible" class="file-warning">You can insert only files:<br /> .jpg .jpeg .png</span>
        <span class="drop-prompt">{{ getDropZoneLabel }}</span>
        <div class="drop-cross"></div>
        <div v-if="isFileInserted && !isWarningVisible" class="process-file">
            <input type="button" class="action-button remove" value="Remove" @click="handleRemove">
            <input type="button" class="action-button upload" value="Upload" @click="handleInsertFile">
        </div>
        <div v-else class="input-element">
            <label for="drop-photo-input" class="input-label action-button">Select file</label>
            <input
                type="file"
                name="drop-photo-input"
                id="drop-photo-input"
                @change="handleInputFile"
                :disabled="isFileInserted"
                 />
        </div>
    </div>
</template>


<script setup lang="ts">
import { type Ref, ref, computed, type ComputedRef } from 'vue';


const props = withDefaults(defineProps<{
    width?: number,
    height?: number,
    dropPrompt: string,
    afterDropPromt: string,
    fileWarning: string,
    acceptableFileExtentions: string[],
    acceptableFileType: string
}>(),{
    width: 250,
    height: 270
})

const emits = defineEmits<{
    (e: 'insertFile', insertedFile: File): void,
    (e: 'removeFile'): void
}>()


const isFileInserted: Ref<boolean> = ref(false)
const isFileOver: Ref<boolean> = ref(false)
const isWarningVisible: Ref<boolean> = ref(false)
const uploadedFile: Ref<File | null> = ref(null)

const getDropZoneCss: ComputedRef<string> = computed(() => {
    let css = 'drop-zone'

    if (isFileInserted.value) {
        css += ' file-inserted'

        return css
    }

    if (isFileOver.value) {
        css += ' file-over'
    }

    return css
})

const getDropZoneLabel: ComputedRef<string> = computed(() => {
    return isFileInserted.value ? props.afterDropPromt : props.dropPrompt
})
const getWidth: ComputedRef<string> = computed(()=>{
    return `${props.width}px`
})
const getHeight: ComputedRef<string> = computed(()=>{
    return `${props.height}px`
})


const handleDropFile = (ev: DragEvent) => {
    if (isFileInserted.value) {
        return
    }

    if (!ev.dataTransfer?.files) {
        return
    }

    const file = processFile(ev.dataTransfer.files[0])

    if (file === null) {
        isWarningVisible.value = true
        
        return
    }

    uploadedFile.value = file
    isFileInserted.value = true
    isFileOver.value = false
}

const handleInputFile = (ev: Event) => {
    const element = ev.currentTarget as HTMLInputElement

    if (isFileInserted.value) {
        element.files = null

        return
    }

    if (element.files === null) {
        return
    }

    const file = processFile(element.files[0])

    if (file === null) {
        isWarningVisible.value = true
        element.files = null

        return
    }

    uploadedFile.value = file
    isFileInserted.value = true
}

const handleIsFileOver = () => {
    isWarningVisible.value = false
    isFileOver.value = !isFileOver.value
}

const handleInsertFile = () =>{    
    emits('insertFile', uploadedFile.value!)
}

const handleRemove = () =>{
    uploadedFile.value = null
    isFileInserted.value = false
    emits('removeFile')
}


const processFile = (insertedFile: File): File | null => {
    let extension = insertedFile.name

    while (true) {
        let indexOfDot = extension.indexOf('.')
        if (indexOfDot < 0) {
            break
        }
        extension = extension.substring(indexOfDot + 1)
    }

    let isAcceptable = false

    for (let i = 0; i < props.acceptableFileExtentions.length; i++) {
        if (props.acceptableFileExtentions[i] === extension) {
            isAcceptable = true
            break
        }
    }

    isAcceptable = insertedFile.type.includes(props.acceptableFileType)

    return isAcceptable ? insertedFile : null
}

</script>


<style scoped>
.drop-zone {
    position: relative;
    width: v-bind(getWidth);
    height: v-bind(getHeight);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #e0fff3;
    border: 1px solid var(--light-blue);
    border-radius: 5px;
    padding: 10px;
}

.drop-zone.file-over {
    background-color: #edfff8;
    border: 1px dashed var(--blue-color);
}

.file-inserted .drop-cross {
    display: none;
}

.drop-cross {
    position: absolute;
    top: calc(50% - 21px);
    left: calc(50% - 21px);
    width: 42px;
    height: 42px;
    border: 1px dashed var(--blue-color);
    border-radius: 50%;
}

.drop-cross::before,
.drop-cross::after {
    content: '';
    position: absolute;
    background-color: var(--blue-color);
    z-index: 5;
}

.drop-cross::before {
    top: 20%;
    left: calc(50% - 1px);
    width: 2px;
    height: 60%;
}

.drop-cross::after {
    top: calc(50% - 1px);
    left: 20%;
    width: 60%;
    height: 2px;
}

.file-warning {
    color: var(--warning-color);
}

.drop-prompt {
    text-align: center;
    font-size: 13pt;
    font-family: Calibri, 'Trebuchet MS', sans-serif;
    color: var(--blue-color);
}

.process-file {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    justify-content: space-between;
}

.input-element {
    display: flex;
}

.action-button {
    height: fit-content;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 5px 7px;
}

.action-button.remove {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.action-button:hover {
    filter: brightness(1.2);
}

.action-button.upload,
.input-label {
    background-color: var(--sky-color);
}

#drop-photo-input {
    display: none !important;
}
</style>
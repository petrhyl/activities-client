<template>
    <div class="photo-cropper">
        <div v-if="isUploading" class="loading-container">
            <LoadingComponent />
        </div>
        <div
            class="image-workspace"
            :class="{ toMove: !isSaving }"
            @mousedown.prevent="handleGrapImage"
            @mousemove="handleMoveImage"
            @mouseup.prevent="handleReleaseImage"
            @mouseleave="handleReleaseImage"
            @wheel.prevent="handleZoom">
            <canvas ref="croppedImage" :class="{ croppedImage: true }"></canvas>
            <div v-if="!isSaving" class="prompt-container">
                <span :class="{ prompt: true, hide: isImageGrapped }">{{ cropPrompt }}</span>
            </div>
            <div
                class="image-container"
                :style="{ top: getImageContainerPositionY, left: getImageContainerPositionX }">
                <img
                    class="cropping-image"
                    :style="{ width: getImageWidth, height: getImageHeight }"
                    :src="photoUrl"
                    alt="uploaded photo">
            </div>
            <div class="controls">
                <input v-if="!isSaving" :class="{ confirm: true, hide: isImageGrapped }" type="button"
                    value="Continue To Save" @click="handleContinue">
                <div v-else class="upload-prompt">
                    <span>Do you want to upload this photo?</span>
                    <div class="upload-controls">
                        <input class="back" type="button" value="Back" @click="handleBack">
                        <input class="upload" type="button" value="Upload" @click="handleUpload">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { type ComputedRef, computed, onUnmounted, ref, type Ref, onMounted } from 'vue';
import LoadingComponent from '@/components/layout/base/LoadingComponent.vue';


interface Dims {
    width: number,
    height: number
}


const props = withDefaults(defineProps<{
    cropPrompt?: string
    photo: File,
    width?: number,
    height?: number,
    requiredWidth: number,
    requiredHeight: number
}>(), {
    width: 250,
    height: 270,
    requiredWidth: 500,
    requiredHeight: 500
})

const emits = defineEmits<{
    (e: 'upload-photo', croppedFoto: File): void
}>()


const photoUrl: Ref<string> = ref(URL.createObjectURL(props.photo))
const originalImage: Ref<HTMLImageElement | null> = ref(null)
const imageWidth: Ref<number> = ref(0)
const imageHeight: Ref<number> = ref(0)
const zoomedImageWidth: Ref<number> = ref(imageWidth.value)
const zoomedImageHeight: Ref<number> = ref(imageHeight.value)
const imageContainerAxisX: Ref<number> = ref(0)
const imageContainerAxisY: Ref<number> = ref(0)
const workspaceWidth: Ref<number> = ref(0)
const workspaceHeight: Ref<number> = ref(0)
const initialImageSizeChangeRatio: Ref<number> = ref(1)
const zoom: Ref<number> = ref(1)
const isImageGrapped: Ref<boolean> = ref(false)
const croppedImage = ref<HTMLCanvasElement | null>(null)
const isSaving: Ref<boolean> = ref(false)
const isUploading: Ref<boolean> = ref(false)

const requiredDimentionsRatio: ComputedRef<number> = computed(() => getRatio(props.requiredWidth, props.requiredHeight))
const getWidth: ComputedRef<string> = computed(() => `${props.width}px`)
const getHeight: ComputedRef<string> = computed(() => `${props.height}px`)
const getImageWidth: ComputedRef<string> = computed(() => `${zoomedImageWidth.value.toFixed(2)}px`)
const getImageHeight: ComputedRef<string> = computed(() => `${zoomedImageHeight.value.toFixed(2)}px`)
const getWorkspaceWidth: ComputedRef<string> = computed(() => `${workspaceWidth.value}px`)
const getWorkspaceHeight: ComputedRef<string> = computed(() => `${workspaceHeight.value}px`)
const getAxisXPositionLimit: ComputedRef<number> = computed(() => workspaceWidth.value - zoomedImageWidth.value)
const getAxisYPositionLimit: ComputedRef<number> = computed(() => workspaceHeight.value - zoomedImageHeight.value)
const getImageContainerPositionX: ComputedRef<string> = computed(() => {
    const limit = getAxisXPositionLimit.value
    if (imageContainerAxisX.value < limit) {
        imageContainerAxisX.value = limit
    }

    if (imageContainerAxisX.value > 0) {
        imageContainerAxisX.value = 0
    }

    return `${imageContainerAxisX.value}px`
})
const getImageContainerPositionY: ComputedRef<string> = computed(() => {
    const limit = getAxisYPositionLimit.value
    if (imageContainerAxisY.value < limit) {
        imageContainerAxisY.value = limit
    }

    if (imageContainerAxisY.value > 0) {
        imageContainerAxisY.value = 0
    }

    return `${imageContainerAxisY.value}px`
})


const handleGrapImage = () => {
    if (isSaving.value) {
        return
    }

    isImageGrapped.value = true
}

const handleReleaseImage = () => {
    isImageGrapped.value = false
}

const handleMoveImage = (ev: MouseEvent) => {
    if (!isImageGrapped.value) {
        return
    }

    const moovedAxisX = imageContainerAxisX.value + ev.movementX
    const moovedAxisY = imageContainerAxisY.value + ev.movementY

    if (moovedAxisX <= 0 && moovedAxisX >= getAxisXPositionLimit.value) {
        imageContainerAxisX.value = moovedAxisX
    }

    if (moovedAxisY <= 0 && moovedAxisY >= getAxisYPositionLimit.value) {
        imageContainerAxisY.value = moovedAxisY
    }
}

const handleZoom = (ev: WheelEvent) => {
    if (isSaving.value) {
        return
    }

    let precision = 1000
    let currentZoom = zoom.value + ev.deltaY / precision

    if (currentZoom > 4) {
        return
    }

    let zoomedWidth = imageWidth.value * currentZoom
    let zoomedHeight = imageHeight.value * currentZoom

    if (getRatio(zoomedWidth, workspaceWidth.value) <= 1
        || getRatio(zoomedHeight, workspaceHeight.value) <= 1) {

        currentZoom = zoom.value

        while (getRatio(imageWidth.value * currentZoom, workspaceWidth.value) >= 1
            && getRatio(imageHeight.value * currentZoom, workspaceHeight.value) >= 1) {

            currentZoom += ev.deltaY / (precision * 10)
        }

        currentZoom -= ev.deltaY / (precision * 10)
        zoomedWidth = imageWidth.value * currentZoom
        zoomedHeight = imageHeight.value * currentZoom
    }

    zoom.value = currentZoom
    zoomedImageWidth.value = zoomedWidth
    zoomedImageHeight.value = zoomedHeight
}

const handleContinue = async () => {
    isSaving.value = true

    croppedImage.value!.width = props.requiredWidth
    croppedImage.value!.height = props.requiredHeight

    const context = croppedImage.value!.getContext('2d')

    const requiredToWorkspaceRatio = props.requiredHeight / workspaceHeight.value
    console.log('width ', ((props.requiredWidth / requiredToWorkspaceRatio) * initialImageSizeChangeRatio.value) / zoom.value);
    console.log('height ', ((props.requiredHeight / requiredToWorkspaceRatio) * initialImageSizeChangeRatio.value) / zoom.value);


    await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            resolve(context?.drawImage(
                img,
                Math.abs(imageContainerAxisX.value * initialImageSizeChangeRatio.value) / zoom.value,
                Math.abs(imageContainerAxisY.value * initialImageSizeChangeRatio.value) / zoom.value,
                ((props.requiredWidth / requiredToWorkspaceRatio) * initialImageSizeChangeRatio.value) / zoom.value,
                ((props.requiredHeight / requiredToWorkspaceRatio) * initialImageSizeChangeRatio.value) / zoom.value,
                0,
                0,
                props.requiredWidth,
                props.requiredHeight
            ))
        }

        img.src = photoUrl.value
    })
}

const handleUpload = () => {
    isUploading.value = true

    let croppedImageFile: File

    croppedImage.value?.toBlob((blo) => {
        if (blo) {
            croppedImageFile = new File([blo], props.photo.name, { type: 'image/jpeg' })
        }

        emits('upload-photo', croppedImageFile)
    }, 'image/jpeg', 1)
}

const handleBack = () => {
    isSaving.value = false
}


const getRatio = (dividend: number, divisor: number) => {
    return divisor !== 0 ? dividend / divisor : 1
}

const resolveDimentionSize = (resolvingDimention: number, comparingDimention: number): number => {
    if (resolvingDimention <= comparingDimention) {
        return comparingDimention
    }

    if (zoom.value === 1) {
        const resolvinComparingRatio = getRatio(resolvingDimention, comparingDimention)

        if (resolvinComparingRatio < 2.2) {
            return resolvingDimention
        } else {
            return comparingDimention * 2.2
        }
    }

    return resolvingDimention
}

const resolvedImageDimentions = (width: number, height: number): Dims => {
    const imageDimentionsRatio = getRatio(width, height)

    let resolvedImageWidth: number
    let resolvedImageHeight: number
    let changeRatio: number

    if (imageDimentionsRatio < requiredDimentionsRatio.value) {
        resolvedImageWidth = resolveDimentionSize(width, workspaceWidth.value)
        changeRatio = getRatio(resolvedImageWidth, width)
        resolvedImageHeight = height * changeRatio
    } else {
        resolvedImageHeight = resolveDimentionSize(height, workspaceHeight.value)
        changeRatio = getRatio(resolvedImageHeight, height)
        resolvedImageWidth = width * changeRatio
    }

    return {
        width: resolvedImageWidth,
        height: resolvedImageHeight
    }
}

const initializePosition = () => {
    const limitX = getAxisXPositionLimit.value
    const limitY = getAxisYPositionLimit.value

    if (limitX <= -2) {
        imageContainerAxisX.value = limitX / 2
    }

    if (limitY <= -2) {
        imageContainerAxisY.value = limitY / 2
    }
}

const initializeOriginImageDimentions = async (): Promise<Dims> => {
    return await new Promise((resolveDimentions) => {
        let img = new Image()

        img.onload = () => {
            resolveDimentions({
                width: img.naturalWidth,
                height: img.naturalHeight
            })
        }

        img.src = photoUrl.value

        originalImage.value = img
    })
}

const initializeWorkspaceDimentions = () => {
    const cropperDimentionsRatio = getRatio(props.width, props.height)

    if (cropperDimentionsRatio > requiredDimentionsRatio.value) {
        workspaceHeight.value = props.height
        workspaceWidth.value = workspaceHeight.value * requiredDimentionsRatio.value
    } else {
        workspaceWidth.value = props.width
        workspaceHeight.value = workspaceWidth.value / requiredDimentionsRatio.value
    }
}

const initializeImageDimentions = (width: number, height: number) => {
    const resolveDimentions = resolvedImageDimentions(width, height)

    initialImageSizeChangeRatio.value = getRatio(height, resolveDimentions.height)

    imageWidth.value = resolveDimentions.width
    imageHeight.value = resolveDimentions.height
    zoomedImageWidth.value = resolveDimentions.width
    zoomedImageHeight.value = resolveDimentions.height
}


onMounted(async () => {
    const dimentions = await initializeOriginImageDimentions()
    initializeWorkspaceDimentions()
    initializeImageDimentions(dimentions.width, dimentions.height)
    initializePosition()
})

onUnmounted(() => {
    URL.revokeObjectURL(photoUrl.value)
})

</script>


<style scoped>
.photo-cropper {
    position: relative;
    width: v-bind(getWidth);
    height: v-bind(getHeight);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--light-blue);
    border: 1px solid var(--light-blue);
    border-radius: 5px;
    padding: 2px;
}

.image-workspace {
    position: relative;
    width: v-bind(getWorkspaceWidth);
    height: v-bind(getWorkspaceHeight);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--light-gray-color);
    overflow: hidden !important;
}

.image-workspace.toMove:hover {
    cursor: move;
}

.image-workspace .prompt-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(v-bind(getWorkspaceWidth) - 4px);
    display: flex;
    justify-content: center;
    padding-top: 5px;
    z-index: 5;
}

.image-workspace .prompt {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    background-color: #f0f8ff9e;
    border-radius: 3px;
    box-shadow: 0 0 3px 2px #f0f8ff9e;
    padding: 1px;
    transition: all 120ms ease-in-out;
}

.image-workspace .controls {
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(v-bind(getWorkspaceWidth) - 4px);
    display: flex;
    justify-content: center;
    padding-bottom: 5px;
    z-index: 5;
}

.image-workspace .confirm {
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', sans-serif;
    background-color: #f0f8ff71;
    border: 1px solid var(--dark-font-color);
    border-radius: 4px;
    outline: 2px solid #f0f8ff71;
    padding: 3px 5px;
    transition: all 120ms ease-in-out;
}

.image-workspace .confirm:hover {
    background-color: #b8deff;
    outline-color: #b8deff;
    cursor: pointer;
}

.image-workspace .upload-prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
    background-color: #b0ebffbf;
    border-radius: 5px;
    padding: 10px;
}

.image-workspace .upload-prompt>span {
    text-align: center;
    text-wrap: wrap;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    color: var(--dark-blue-color);
}

.image-workspace .upload-controls {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.image-workspace .upload-controls input {
    padding: 5px 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}

.image-workspace .upload-controls input:hover {
    filter: brightness(0.8);
}

.image-workspace .upload-controls .upload {
    color: #feffee;
    background-color: var(--dark-blue-color);
}

.image-workspace .upload-controls .back {
    color: #e2e2e2;
    background-color: #6c808c;
}

.image-workspace .hide {
    opacity: 0.4;
}


.croppedImage {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    display: none !important;
}

.image-container {
    position: absolute;
    width: v-bind(getImageWidth);
    height: v-bind(getImageHeight);
}

.loading-container {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: #b8deff;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
</style>
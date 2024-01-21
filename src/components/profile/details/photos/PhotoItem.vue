<template>
    <li class="photo-element">
        <div :id="`${PhotoOptionsElementIdPrefix}${photo.id}`" class="photo-options-container">
            <div class="photo-options-button" :class="{ active: isModalOpened }" @click="handleToggleOptions">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <PhotoItemOptions v-if="isModalOpened" :is-set-as-main="photo.isMain" @set-as-main="handleSetAsMain" @delte-photo="handleDelete" />
        </div>
        <img
            :src="photo.url"
            :alt="`photo_${photo.id}`" />
    </li>
</template>


<script setup lang="ts">
import type { PhotoImage } from '@/models/User';
import { keyProvidedModalState, keyProvidedWindowWidth } from '@/utils/providedKey';
import { WindowWidth } from '@/utils/constanses/enums';
import { type Ref, ref, computed, inject, type ComputedRef, watch } from 'vue';
import PhotoItemOptions from './PhotoItemOptions.vue';
import { type ModalInState, type ModalState } from '@/models/auxillary/interfaces';
import { PhotoOptionsElementIdPrefix} from '@/utils/constanses/photoModalConst';


const props = defineProps<{
    photo: PhotoImage
}>()

const emits = defineEmits<{
    (e: 'set-as-main', id: string): void,
    (e: 'delete-photo', id: string): void
}>()


const windowWidth = inject(keyProvidedWindowWidth)


const getImageWidth: ComputedRef<string> = computed(() => {
    switch (windowWidth?.value) {
        case WindowWidth.PHONE:
            return '50%'
        case WindowWidth.TABLET:
        case WindowWidth.SMALL:
            return '33%'
        default:
            return '20%'
    }
})

const thisModalInState: ModalInState = {
    id: `modal${props.photo.id}`,
    isOpen: false,
    elementId: `${PhotoOptionsElementIdPrefix}${props.photo.id}`
}

const { modalInState, setOpenModal, setCloseModal } = inject<ModalState>(keyProvidedModalState, { modalInState: thisModalInState, setOpenModal: () => { }, setCloseModal: () => { } })

const isModalOpened: Ref<boolean> = ref(false)

const handleToggleOptions = () => {
    if (isModalOpened.value) {
        setCloseModal()

        return
    }

    setOpenModal(thisModalInState.id, thisModalInState.elementId)
}

const handleSetAsMain = () => {
    emits('set-as-main', props.photo.id)
}

const handleDelete = () => {
    emits('delete-photo', props.photo.id)
}

watch(modalInState, () => {
    if (modalInState.id === thisModalInState.id) {
        isModalOpened.value = modalInState.isOpen

        return
    }

    isModalOpened.value = false
})

</script>


<style scoped>
.photo-element {
    position: relative;
    width: calc(v-bind(getImageWidth) - var(--photo-gap));
}

.photo-element img {
    width: 100%;
}

.photo-options-container {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    row-gap: 6px;
    padding: 8px;
}

.photo-options-button {
    --back-color: #fcffea77;
    padding: 3px;
    background-color: var(--back-color);
    display: flex;
    column-gap: 4px;
    box-shadow: 0 0 3px 2px var(--back-color);
    cursor: pointer;
}

.photo-options-button:hover {
    --back-color: #fcffeacc;
}

.photo-options-button.active {
    --back-color: #fcffeacc;
}

.photo-options-button>span {
    position: relative;
    width: 5px;
    height: 5px;
    background-color: var(--dark-blue-color);
    border-radius: 50%;
}
</style>
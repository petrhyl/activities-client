<template>
    <div :id="`${OptionsElementIdPrefix}${props.popupIdSufix}`" class="options">
        <div
                class="options-button"
                :class="{ active: isModalOpened }"
                @click="handleToggleOptions">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div v-if="isModalOpened" class="option-items">
                <slot>                
                </slot>
            </div>
        </div>
</template>



<script setup lang="ts">
import type { ModalInState, ModalState } from '@/models/auxillary/interfaces';
import { OptionsElementIdPrefix } from '@/utils/constanses/optionsPopupConsts';
import { keyProvidedModalState } from '@/utils/providedKey';
import { type Ref, ref, inject, watch } from 'vue';


const props = defineProps<{
    popupIdSufix :string
}>()


const thisModalInState: ModalInState = {
    id: `modal${props.popupIdSufix}`,
    isOpen: false,
    elementId: `${OptionsElementIdPrefix}${props.popupIdSufix}`
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


watch(modalInState, () => {
    if (modalInState.id === thisModalInState.id) {
        isModalOpened.value = modalInState.isOpen

        return
    }

    isModalOpened.value = false
})
</script>



<style scoped>
.options{
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    row-gap: 6px;
}

.options-button {
    --back-color: #fcffea67;
    background-color: var(--back-color);
    display: flex;
    column-gap: 4px;
    box-shadow: 0 0 3px 2px var(--back-color);
    border-radius: 3px;
    padding: 4px 5px;
    cursor: pointer;
}

.options-button:hover {
    --back-color: #fcffeae6;
}

.options-button.active {
    --back-color: #fcffeae6;
}

.options-button>span {
    position: relative;
    width: 5px;
    height: 5px;
    background-color: var(--dark-blue-color);
    border-radius: 50%;
}
</style>
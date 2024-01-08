<template>
    <div
        :id="elementId"
        :class="getCustomSelectCssClasses"
        ref="selecteElement"
        @click="handleClickSelectElement"
        @blur="handleCloseSelectElement"
        @keyup="handleSelectOptionOnPressKey">
        <div class="select-selected-item" :value="getSelectedOption.value" :selected-id="getSelectedOption.id">{{
            getSelectedOption.text }}</div>
        <div class="drop-down-arrow"></div>
        <div class="select-items-container">
            <div :class="`options-container ${optionsAnimationClass}`">
                <div
                    v-for="opt in selectOptions"
                    :key="opt.id"
                    :id="opt.id"
                    :value="opt.value"
                    @mousedown="handleSelect(opt.id)"
                    :selected="opt.isSelected"
                    :class="{ 'select-option': true, selected: opt.isSelected }">{{ opt.text }}</div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { type SelectOption } from "@/models/auxillary/interfaces";
import { computed, ref, type ComputedRef, type Ref, reactive, onMounted, watch } from "vue";


const props = defineProps<{
    cssClass: string,
    elementName: string,
    elementId: string,
    options: SelectOption[]
}>();

const emits = defineEmits<{
    (ev: 'change-selected', option: SelectOption): void
}>();

const selecteElement = ref<HTMLDivElement | null>(null);

const selectOptions: Ref<SelectOption[]> = ref(props.options);
const selectedOption: Ref<SelectOption> = ref({ id: '', value: '', text: '', isSelected: true });
const isContainerOpened: Ref<boolean> = ref(false);
const optionsAnimationClass: Ref<string> = ref('');
const containerDisplayValue: Ref<string> = ref('none');
const containerDisplayTimeoutId: Ref<number | undefined> = ref();

const getCustomSelectCssClasses: ComputedRef<string> = computed(() => {
    return `${props.cssClass} this-custom-select`;
});

const getSelectedOption: ComputedRef<SelectOption> = computed(() => {
    if (selectedOption.value.value.trim() === '') {
        const selectedId = selectOptions.value.find(o => o.isSelected);

        if (!selectedId || selectedId.value.trim() === '') {
            return {
                id: '-1',
                value: '-1',
                text: '- select -',
                isSelected: true
            };
        }

        return selectedId;
    }

    return selectedOption.value;
});


const getArrowSize: ComputedRef<string> = computed(() => {
    if (!selecteElement.value) {
        return '5px';
    }

    const elementHeight = +selecteElement.value.clientHeight;
    const size = Math.round(elementHeight / 3.5);

    return `${size}px`;
});

const getArrowPadding: ComputedRef<string> = computed(() => {
    if (!selecteElement.value) {
        return '10px';
    }

    const elementHeight = +selecteElement.value.clientHeight;
    const size = Math.round(elementHeight / 3.5);

    const padding = Math.round(Math.sqrt(2 * (size ^ 2))) + 10;

    return `${padding}px`;
});

onMounted(() => {
    selecteElement.value!.tabIndex = 0;
});

watch(props, () => {
    let selectedId: SelectOption | undefined;
    if (selectOptions.value.length > 0) {
        selectOptions.value = []
    }

    props.options.forEach((opt) => {
        if (opt.isSelected) {
            selectedId = opt;
        }
        selectOptions.value.push(opt);
    });

    if (selectedId && selectedOption.value.value === '') {
        selectedOption.value = selectedId;
    }
});

watch(selectedOption, (current, _) => {
    emits('change-selected', current);
});


// * * * * * not vue function * * * * * 

const handleSelectOptionOnPressKey = (ev: KeyboardEvent) => {
    if (ev.shiftKey || ev.ctrlKey) {
        return;
    }

    switch (ev.key) {
        case 'Enter': toggleOptionVisibility(!isContainerOpened.value);
            break;
        case 'Escape': toggleOptionVisibility(false);
            break;
        case 'ArrowDown': browseOptions(false);
            break;
        case 'ArrowUp': browseOptions(true);
            break;
        default:
            break;
    }
}

const handleCloseSelectElement = () => {
    toggleOptionVisibility(false);
}

const handleClickSelectElement = () => {
    toggleOptionVisibility(!isContainerOpened.value);
}

const handleSelect = (selectedId: string) => {
    let selectedOptionIndex = 0;
    for (let index = 0; index < selectOptions.value.length; index++) {
        if (selectOptions.value[index].id === selectedId) {
            selectedOptionIndex = index;
            selectOptions.value[index].isSelected = true;

            continue;
        }

        selectOptions.value[index].isSelected = false;
    }

    selectedOption.value = {
        id: selectedId,
        text: selectOptions.value[selectedOptionIndex].text,
        value: selectOptions.value[selectedOptionIndex].value,
        isSelected: true
    }
}

const browseOptions = (toTop: boolean) => {
    let selectedIndex = 0;
    let isAnySelected = false;
    selectOptions.value.forEach((opt, i) => {
        if (opt.isSelected) {
            selectedIndex = i;
            isAnySelected = true;
            return;
        }
    });

    if (!isAnySelected) {
        selectedIndex = -1;
    }

    if (toTop) {
        selectedIndex--;
        if (selectedIndex < 0) {
            selectedIndex = selectOptions.value.length - 1;
        }
    } else {
        selectedIndex++;
        if (selectedIndex > selectOptions.value.length - 1) {
            selectedIndex = 0;
        }
    }

    handleSelect(selectOptions.value[selectedIndex].id);
}

const toggleOptionVisibility = (isOpening: boolean) => {
    isContainerOpened.value = isOpening;

    clearTimeout(containerDisplayTimeoutId.value);

    if (isContainerOpened.value) {
        optionsAnimationClass.value = 'open';
        containerDisplayValue.value = 'block';
    } else {
        optionsAnimationClass.value = 'close';
        containerDisplayTimeoutId.value = setTimeout(() => {
            containerDisplayValue.value = 'none';
        }, 251);
    }
}


</script>



<style scoped>
.this-custom-select {
    position: relative;
    background-color: field;
    outline: none;
    padding-right: 20px;
}

.this-custom-select:focus {
    background-color: #e9ffff;
}

.drop-down-arrow {
    position: absolute;
    top: 30%;
    right: v-bind(getArrowPadding);
    transform-origin: center;
    height: v-bind(getArrowSize);
    width: v-bind(getArrowSize);
    border-bottom: 2px solid var(--dark-font-color);
    border-right: 2px solid var(--dark-font-color);
    transform: rotateZ(45deg);
}

.select-items-container {
    position: absolute;
    display: v-bind(containerDisplayValue);
    top: 100%;
    left: 5px;
    width: calc(100% - 10px);
    height: 0;
    max-height: 0;
}

.options-container {
    position: relative;
    width: 100%;
    background-color: field;
    border: 1px solid var(--light-gray-color);
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 1px 3px 3px #c8c8c8;
    padding: 5px 0;
    transform-origin: top;
    overflow: hidden;
    z-index: 100;
}

.options-container.open {
    animation-name: openContainer;
    animation-duration: 200ms;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}

.options-container.close {
    animation-name: closeContainer;
    animation-duration: 200ms;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}

.select-option {
    padding: 5px 10px;
    transition: all 120ms linear;
    z-index: 101;
}

div.select-option[selected="true"],
.select-option:hover {
    background-color: var(--light-gold-color);
}


@keyframes openContainer {
    from {
        transform: scaleY(0);
    }
    to {
        transform: scaleY(1);
    }
}

@keyframes closeContainer {
    from {
        transform: scaleY(1);
    }
    to {
        transform: scaleY(0);
    }
}
</style>
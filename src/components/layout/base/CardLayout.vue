<template>
    <div :class="getCardCss">
        <div v-if="isHeaderUsed" :class="getHeaderCss">
            <h3 v-if="isTitleProvided" :class="getTitleCss">
                {{ headerText }}
            </h3>
            <slot v-else name="header"></slot>
        </div>
        <div :class="getContentCss">
            <slot></slot>
        </div>
    </div>
</template>



<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';



const props = withDefaults(defineProps<{
    headerText?: string | null,
    hasHeaderSmallTitle?: boolean,
    hasTitleDarkColor?: boolean,
    useSlotForHeader?: boolean,
    cardCss?: string | null
    usePadding?: boolean
}>(), {
    headerText: null,
    hasHeaderSmallTitle: false,
    hasTitleDarkColor: false,
    useSlotForHeader: false,
    cardCss: null,
    usePadding: true
})


const isTitleProvided: ComputedRef<boolean> = computed(() => {
    return props.headerText !== null && props.headerText !== '' && !props.useSlotForHeader
})

const isHeaderUsed: ComputedRef<boolean> = computed(() => {
    return isTitleProvided.value || props.useSlotForHeader
})

const getTitleCss: ComputedRef<string> = computed(() => {
    let css = 'header-title'
    if (props.hasHeaderSmallTitle) {
        css += ' small-title'
    } else {
        css += ' regular-title'
    }

    if (props.hasTitleDarkColor) {
        css += ' dark-title'
    } else {
        css += ' light-title'
    }

    return css
})

const getHeaderCss: ComputedRef<string> = computed(() => {
    let css = 'card-header'
    if (props.hasTitleDarkColor) {
        return css += ' dark-header'
    }

    return css += ' light-header'
})

const getCardCss: ComputedRef<string> = computed(() => {
    let css = 'card-layout'
    if (props.cardCss && props.cardCss !== '') {
        css += ` ${props.cardCss}`
    }
    return css
})

const getContentCss: ComputedRef<string> = computed(() => {
    let css = 'card-content'
    if (props.usePadding) {
        css += ' padding'
    }
    return css
})

</script>



<style scoped>
.card-layout {
    background-color: #f1f7fd;
    box-shadow: 1px 1px 4px 1px #c8c8c8;
    border-radius: 5px;
}

.card-content.padding {
    padding: 12px 15px;
}

.card-header {
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 12px;
}

.header-title {
    width: 100%;
    text-align: center;
    font-family: 'Lucida Sans', Geneva, Verdana, sans-serif;
}

.light-header {
    background: var(--gradient-background);
}

.dark-header {
    background: var(--swapped-gradient-background);
}

.light-title {
    color: var(--light-gold-color);
}

.dark-title {
    color: var(--dark-font-color);
}

.small-title {
    font-size: 13pt;
}

.regular-title {
    font-size: 15pt;
}
</style>
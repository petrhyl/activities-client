<template>
    <div>
        <img v-if="isImageUrlValid" :class="getCssClasses" :src="validImageUrl" :alt="alternativeImageText" />
        <slot v-if="useAlternativeElement && !isImageUrlValid"></slot>
    </div>
</template>


<script setup lang="ts">
import { onBeforeMount, type Ref, ref, watch, type ComputedRef, computed } from 'vue';


const props = withDefaults(defineProps<{
    imageUrl: string | null | undefined,
    alternativeImageText: string,
    imageCss: string,
    useAlternativeElement: boolean
}>(),{
    useAlternativeElement : false
})


const isImageUrlValid: Ref<boolean> = ref(false)
const validImageUrl: Ref<string> = ref('')

const getCssClasses: ComputedRef<string> = computed(()=>{
    return 'valid-image ' + props.imageCss
})


const processUrl =async () => {
    try {
        if (!props.imageUrl) {
            throw new Error("Image URL is not defined.")
        }
        const imgUrl = new URL(props.imageUrl)
        const fetchedResponse = await fetch(imgUrl)
        if (fetchedResponse.status !== 200) {
            throw new Error("Bad URL of the image.")
        }
        isImageUrlValid.value = true
        validImageUrl.value = props.imageUrl
    } catch (error) {
        isImageUrlValid.value = false
    } 
}


onBeforeMount(async () => {
       processUrl()
})

watch(props, () =>{
    processUrl()
})

</script>


<style scoped>
div{
    display: flex;
}
.valid-image{
    width: 100%;
}
</style>
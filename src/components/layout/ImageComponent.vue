<template>
    <div :class="cssClases">
        <img v-if="isImageUrlValid" class="valid-image" :src="validImageUrl" :alt="alternativeImageText" />
        <slot v-if="useAlternativeElement && !isImageUrlValid"></slot>
    </div>
</template>


<script setup lang="ts">
import { onBeforeMount, type Ref, ref, watch } from 'vue';


const props = withDefaults(defineProps<{
    imageUrl: string | null | undefined,
    alternativeImageText: string,
    cssClases: string,
    useAlternativeElement: boolean
}>(),{
    useAlternativeElement : false
})


const isImageUrlValid: Ref<boolean> = ref(false)
const validImageUrl: Ref<string> = ref('')


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
.valid-image{
    width: 100%;
}
</style>
<template>
<div class="form-component">
    <label v-if="labelText !== ''" :for="labelFor">{{ labelText }}</label>
    <slot></slot>
    <div class="warning-message">
        <span v-if="displayingMessage !== ''">{{ displayingMessage }}</span>
    </div>
</div>
</template>


<script setup lang="ts">
import { computed, reactive } from 'vue';


const props = withDefaults(defineProps<{
    labelFor: string,
    labelText: string,
    warningMessage: string
}>(), { labelFor: '', labelText: '', warningMessage: ''});


const {warningMessage} = reactive(props);

const displayingMessage = computed(()=>{
    return warningMessage;
})


</script>


<style scoped>
.form-component{
    width: 100%;
    display: flex;
    flex-direction: column;
}

.form-component label{
    font-size: 11pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    color: #3f3f3f;
    margin: 0 auto 3px 15px;
}

.warning-message{
    width: 100%;
    height: 20px;
    min-height: 20px;
    padding-left: 10px;
}

.warning-message span{
    font-family: Cambria, Georgia, 'Times New Roman', serif;
    font-size: 10pt;
    text-align: left;
    color: #9f0030;
}
</style>
<template>
    <div class="form-component">
        <div class="lable-and-warning">
            <label v-if="labelText !== ''" :for="labelFor">{{ labelText }}</label>
            <span v-if="warningMessage !== ''" class="warning-message">{{ warningMessage }}</span>
        </div>
        <slot></slot>
    </div>
</template>



<script setup lang="ts">
import { computed, reactive, ref } from 'vue';


const props = withDefaults(defineProps<{
    labelFor: string,
    labelText: string,
    warningMessage: string
}>(), { labelFor: '', labelText: '', warningMessage: '' });


</script>
   


<style scoped>
.form-component {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.form-component label {
    font-size: 11pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    color: #666666;

}

.lable-and-warning {
    display: inline;
    margin: 0 auto 3px 15px;
}

.warning-message {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 8pt;
    text-align: left;
    color: #9f0030;
    padding-left: 15px;
}
</style>
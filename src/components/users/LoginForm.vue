<script setup lang="ts">
import FormLayout from "@/components/layout/form/FormLayout.vue";
import FormComponent from "@/components/layout/form/FormComponent.vue";
import FormComponentContainer from "@/components/layout/form/FormComponentContainer.vue";
import { Ref, ref } from "vue";


const invalidMessage: Ref<string> = ref('');

// * * * * * non vue functions * * * * *

const handleSubmit = () =>{

}
</script>


<template>
    <FormLayout @submit-form="handleSubmit" :invalid-message="invalidMessage">
        <FormComponent>
            <input type="email" id="login-email" name="login-email" />
        </FormComponent>
        <FormComponent>
            <input type="password" id="login-password" name="login-password" />
        </FormComponent>
        <FormComponentContainer>
            <input type="submit" id="submit-login-button" value="Log in" />
        </FormComponentContainer>
    </FormLayout>
</template>


<style>
input[type='submit'] {
    font-size: 12pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    font-weight: 600;
    color: #333131;
    background-color: #b7ffe7;
    outline: none;
    border: 1px solid #7b9ae1;
    border-radius: 7px;
    padding: 7px 0px;
}

input[type='submit']:hover {
    border-color: #ade1ff;
}

input.disabled {
    background-color: #969696;
    border-color: #969696;
}
</style>
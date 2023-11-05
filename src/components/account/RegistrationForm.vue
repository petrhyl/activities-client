<template>
    <FormLayout @submit-form="handleSubmit" :invalid-message="invalidMessage" form-styles="card">
        <FormComponent label-for="register-username" label-text="User Name" :warning-message="''">
            <input type="username" id="register-username" name="register-username" class="form-input-element" />
        </FormComponent>
        <FormComponent label-for="register-displayedname" label-text="How to call you?" :warning-message="''">
            <input type="displayedname" id="register-displayedname" name="register-displayedname" class="form-input-element" />
        </FormComponent>
        <FormComponent label-for="register-email" label-text="E-mail" :warning-message="''">
            <input type="email" id="register-email" name="register-email" class="form-input-element" />
        </FormComponent>
        <FormComponent label-for="register-password" label-text="Password" :warning-message="''">
            <input type="password" id="register-password" name="register-password" class="form-input-element" />
        </FormComponent>
        <FormComponent label-for="register-password-check" label-text="Password Checking" :warning-message="''">
            <input type="password" id="register-password-check" name="register-password-check" class="form-input-element" />
        </FormComponent>
        <FormComponentContainer>
            <div></div><input type="submit" id="submit-register-button" value="Sign up" />
        </FormComponentContainer>
    </FormLayout>
</template>


<script setup lang="ts">
import FormLayout from "@/components/layout/form/FormLayout.vue";
import FormComponent from "@/components/layout/form/FormComponent.vue";
import FormComponentContainer from "@/components/layout/form/FormComponentContainer.vue";
import { type Ref, ref } from "vue";


enum FormActions {
    userName = 'userName',
    displayedName = 'displayedName',
    email = 'email',
    password = 'password'
}


const invalidMessage: Ref<string> = ref('');



const handleSubmit = () =>{

}


// * * * * * non vue functions * * * * *
</script>


<style scoped>
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
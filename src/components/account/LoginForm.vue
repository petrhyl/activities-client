<template>
    <FormLayout @submit-form="handleSubmit" :invalid-message="invalidMessage" form-styles="card">
        <FormComponent label-for="login-username" label-text="User Name" :warning-message="formInputs.username.warning">
            <input
                type="text"
                id="login-username"
                name="login-username"
                class="form-input-element"
                v-model="formInputs.username.value"
                @input="handleChangeValue(FormActions.username)"
                @blur="handleValidateInput(FormActions.username)" />
        </FormComponent>
        <FormComponent label-for="login-password" label-text="Password" :warning-message="formInputs.password.warning">
            <input
                type="password"
                id="login-password"
                name="login-password"
                class="form-input-element"
                v-model="formInputs.password.value"
                @input="handleChangeValue(FormActions.password)"
                @blur="handleValidateInput(FormActions.password)" />
        </FormComponent>
        <FormComponentContainer>
            <div></div>
            <input
                type="submit"
                id="submit-login-button"
                value="Log in"
                :class="{ disabled: isSubmitting }"
                :disabled="isSubmitting" />
        </FormComponentContainer>
    </FormLayout>
</template>



<script setup lang="ts">
import FormLayout from "@/components/layout/form/FormLayout.vue";
import FormComponent from "@/components/layout/form/FormComponent.vue";
import FormComponentContainer from "@/components/layout/form/FormComponentContainer.vue";
import { type Ref, ref, reactive, watch } from "vue";
import type { Login } from "@/models/User";
import type { FormInputToValidate } from "@/models/auxillary/interfaces";
import { defineChangeOfInput } from "@/utils/stateUndependentFunctions";
import { isUserNameValid } from "@/utils/inputValidation";


enum FormActions {
    username = 'username',
    password = 'password'
}

interface FormInputValues {
    username: FormInputToValidate,
    password: FormInputToValidate
}

const emptyFromInput: FormInputToValidate = {
    value: '',
    isValid: false,
    isChanged: false,
    warning: ''
}

const emptyFormInputs: FormInputValues = {
    username: { ...emptyFromInput },
    password: { ...emptyFromInput }
}


const props = defineProps<{
    isSubmitting: boolean
}>()

const emits = defineEmits<{
    (e: 'submit-form', login: Login): Promise<void>
}>()

const formInputs = reactive(emptyFormInputs)
const invalidMessage: Ref<string> = ref('')
const isFormValid: Ref<boolean> = ref(false)
const isFormSubmitting: Ref<boolean> = ref(false)

watch(props, ()=>{
    isFormSubmitting.value = props.isSubmitting
});


const handleChangeValue = (action: FormActions) => {
    switch (action) {
        case FormActions.username:
            defineChangeOfInput(formInputs.username)
            break
        case FormActions.password:
            defineChangeOfInput(formInputs.password)
            break
        default:
            break
    }
}

const handleValidateInput = (action: FormActions) => {
    switch (action) {
        case FormActions.username:
            if (formInputs.username.isChanged && !isUserNameValid(formInputs.username.value)) {
                formInputs.username.isValid = false
                formInputs.username.warning = 'Please, enter your user name correctly.'
            }
            break;
        case FormActions.password:
            if (formInputs.password.value.trim().length < 4 && formInputs.password.isChanged) {
                formInputs.password.isValid = false
                formInputs.password.warning = 'Please, fill the password'
            }
            break;
        default:
            break;
    }
}

const validateForm = () => {
    handleValidateInput(FormActions.username)
    handleValidateInput(FormActions.password)

    if (!formInputs.username.isValid || !formInputs.password.isValid) {
        isFormValid.value = false

        return
    }

    isFormValid.value = true
}

const handleSubmit = async () => {
    isFormSubmitting.value = true

    validateForm()

    if (!isFormValid.value) {
        isFormSubmitting.value = false
        invalidMessage.value = 'Please fill credentials correctly.'

        return
    }

    const login: Login = {
        username: formInputs.username.value,
        password: formInputs.password.value
    }

    await emits('submit-form', login) 
}

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
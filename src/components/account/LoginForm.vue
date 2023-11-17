<template>
    <FormLayout @submit-form="handleSubmit" :invalid-message="invalidMessage" form-styles="card">
        <FormComponent label-for="login-email" label-text="E-mail" :warning-message="formInputs.email.warning">
            <input
                type="email"
                id="login-email"
                name="login-email"
                class="form-input-element"
                v-model="formInputs.email.value"
                @input="handleChangeValue(FormActions.email)"
                @blur="handleValidateInput(FormActions.email)" />
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
import { isEmailValid } from "@/utils/inputValidation";


enum FormActions {
    email = 'email',
    password = 'password'
}

interface FormInputValues {
    email: FormInputToValidate,
    password: FormInputToValidate
}

const emptyFromInput: FormInputToValidate = {
    value: '',
    isValid: false,
    isChanged: false,
    warning: ''
}

const emptyFormInputs: FormInputValues = {
    email: { ...emptyFromInput },
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
        case FormActions.email:
            defineChangeOfInput(formInputs.email)
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
        case FormActions.email:
            if (formInputs.email.isChanged && !isEmailValid(formInputs.email.value)) {
                formInputs.email.isValid = false
                formInputs.email.warning = 'Please, enter your e-mail correctly.'
            }
            break;
        case FormActions.password:
            if (formInputs.password.value.length < 4 && formInputs.password.isChanged) {
                formInputs.password.isValid = false
                formInputs.password.warning = 'Please, fill the password'
            }
            break;
        default:
            break;
    }
}

const validateForm = () => {
    handleChangeValue(FormActions.email)
    handleChangeValue(FormActions.password)

    if (!formInputs.email.isValid || !formInputs.password.isValid) {
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
        email: formInputs.email.value,
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
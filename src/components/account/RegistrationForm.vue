<template>
    <FormLayout @submit-form="handleSubmit" :invalid-message="invalidMessage" form-styles="card">
        <FormComponent label-for="register-username" label-text="User Name" :warning-message="formInputs.userName.warning">
            <input
                type="username"
                id="register-username"
                name="register-username"
                class="form-input-element"
                v-model="formInputs.userName.value"
                @input="handleChangeValue(FormActions.userName)"
                @blur="handleValidateInput(FormActions.userName)" />
        </FormComponent>
        <FormComponent label-for="register-displayedname" label-text="How to call you?"
            :warning-message="formInputs.displayedName.warning">
            <input
                type="displayedname"
                id="register-displayedname"
                name="register-displayedname"
                class="form-input-element"
                v-model="formInputs.displayedName.value"
                @input="handleChangeValue(FormActions.displayedName)"
                @blur="handleValidateInput(FormActions.displayedName)" />
        </FormComponent>
        <FormComponent label-for="register-email" label-text="E-mail" :warning-message="formInputs.email.warning">
            <input
                type="email"
                id="register-email"
                name="register-email"
                class="form-input-element"
                v-model="formInputs.email.value"
                @input="handleChangeValue(FormActions.email)"
                @blur="handleValidateInput(FormActions.email)" />
        </FormComponent>
        <FormComponent label-for="register-password" label-text="Password" :warning-message="formInputs.password.warning">
            <input
                type="password"
                id="register-password"
                name="register-password"
                class="form-input-element"
                v-model="formInputs.password.value"
                @input="handleChangeValue(FormActions.password)"
                @blur="handleValidateInput(FormActions.password)" />
        </FormComponent>
        <FormComponent label-for="register-password-check" label-text="Password Checking"
            :warning-message="formInputs.passwordCheck.warning">
            <input
                type="password"
                id="register-password-check"
                ame="register-password-check"
                class="form-input-element"
                v-model="formInputs.passwordCheck.value"
                @input="handleChangeValue(FormActions.passwordCheck)"
                @blur="handleValidateInput(FormActions.passwordCheck)" />
        </FormComponent>
        <FormComponentContainer>
            <div></div>
            <input
                type="submit"
                id="submit-register-button"
                value="Sign up"
                :class="{ disabled: isSubmitting }"
                :disabled="isSubmitting" />
        </FormComponentContainer>
    </FormLayout>
</template>



<script setup lang="ts">
import FormLayout from "@/components/layout/form/FormLayout.vue";
import FormComponent from "@/components/layout/form/FormComponent.vue";
import FormComponentContainer from "@/components/layout/form/FormComponentContainer.vue";
import { type FormInputToValidate } from "@/models/auxillary/interfaces";
import { type Ref, ref, reactive, watch } from "vue";
import { isEmailValid, isNameValid, isPasswordValid, isUserNameValid } from "@/utils/inputValidation";
import { defineChangeOfInput } from "@/utils/stateUndependentFunctions";
import type { UserRegistration } from "@/models/User";


enum FormActions {
    userName = 'userName',
    displayedName = 'displayedName',
    email = 'email',
    password = 'password',
    passwordCheck = 'passwordCheck'
}

interface FormInputValues {
    userName: FormInputToValidate,
    displayedName: FormInputToValidate,
    email: FormInputToValidate,
    password: FormInputToValidate,
    passwordCheck: FormInputToValidate
}

const emptyFromInput: FormInputToValidate = {
    value: '',
    isValid: false,
    isChanged: false,
    warning: ''
}

const emptyFormInputs: FormInputValues = {
    userName: { ...emptyFromInput },
    displayedName: { ...emptyFromInput },
    email: { ...emptyFromInput },
    password: { ...emptyFromInput },
    passwordCheck: { ...emptyFromInput }
}


const props = defineProps<{
    isSubmitting: boolean
}>()

const emits = defineEmits<{
    (e: 'submit-form', userRegistration: UserRegistration): Promise<void>
}>();


const formInputs = reactive(emptyFormInputs);
const invalidMessage: Ref<string> = ref('');
const isFormValid: Ref<boolean> = ref(false);
const isFormSubmitting: Ref<boolean> = ref(false);

watch(props, () => {
    isFormSubmitting.value = props.isSubmitting
});


const handleChangeValue = (action: FormActions) => {
    switch (action) {
        case FormActions.userName:
            defineChangeOfInput(formInputs.userName)
            break;
        case FormActions.displayedName:
            defineChangeOfInput(formInputs.displayedName)
            break;
        case FormActions.email:
            defineChangeOfInput(formInputs.email)
            break;
        case FormActions.password:
            defineChangeOfInput(formInputs.password)
            break;
        case FormActions.passwordCheck:
            defineChangeOfInput(formInputs.passwordCheck)
            break;
        default:
            break;
    }
}


const handleValidateInput = (action: FormActions) => {
    switch (action) {
        case FormActions.userName:
            if (!isUserNameValid(formInputs.userName.value) && formInputs.userName.isChanged) {
                formInputs.userName.isValid = false
                formInputs.userName.warning = 'You can use at least three letters or (-_).'
            }
            break;
        case FormActions.displayedName:
            if (!isNameValid(formInputs.displayedName.value) && formInputs.displayedName.isChanged) {
                formInputs.displayedName.isValid = false
                formInputs.displayedName.warning = 'Please, enter valid name.'
            }
            break;
        case FormActions.email:
            if (!isEmailValid(formInputs.email.value) && formInputs.email.isChanged) {
                formInputs.email.isValid = false
                formInputs.email.warning = 'E-mail address is not valid.'
            }
            break;
        case FormActions.password:
            if (!isPasswordValid(formInputs.password.value) && formInputs.password.isChanged) {
                formInputs.password.isValid = false
                formInputs.password.warning = 'Please, use at least one uppercase, lowercase letter and digit.'
            }
            break;
        case FormActions.passwordCheck:
            if (!formInputs.passwordCheck.isChanged) {
                break;
            }
            if (!isPasswordValid(formInputs.passwordCheck.value)) {
                formInputs.passwordCheck.isValid = false
                formInputs.passwordCheck.warning = 'Password has to contain at least one uppercase and lowercase letter and one digit.'
            }
            if (formInputs.passwordCheck.value !== formInputs.password.value) {
                formInputs.passwordCheck.isValid = false
                formInputs.passwordCheck.warning = 'Passwords do not match.'
            }
            break;
        default:
            break;
    }
}

const validateForm = () => {
    handleChangeValue(FormActions.userName)
    handleChangeValue(FormActions.displayedName)
    handleChangeValue(FormActions.email)
    handleChangeValue(FormActions.password)
    handleChangeValue(FormActions.passwordCheck)

    if (!formInputs.userName.isValid
        || !formInputs.displayedName.isValid
        || !formInputs.email.isValid
        || !formInputs.password.isValid
        || !formInputs.passwordCheck.isValid) {

        isFormValid.value = false

        return
    }

    isFormValid.value = true;
}

const handleSubmit = async () => {
    isFormSubmitting.value = true

    validateForm()

    if (!isFormValid.value) {
        isFormSubmitting.value = false
        invalidMessage.value = 'Please, fill in all informations correctly.'

        return
    }

    const user: UserRegistration = {
        userName: formInputs.userName.value,
        displayName: formInputs.displayedName.value,
        email: formInputs.email.value,
        password: formInputs.password.value
    }

    await emits('submit-form', user)
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
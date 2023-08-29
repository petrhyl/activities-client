<template>
    <ResponseMessage v-if="response.isResponded" :is-error="!response.isSuccessful"
        :message="response.message" />
    <FormLayout v-if="!response.isResponded" @submit-form="handleSubmitForm" :form-styles="'card'">
        <FormComponent label-for="activity-title-input" label-text="Activity Title" warning-message="">
            <input type="text" name="title" class="form-input-element" id="activity-title-input"
                v-model.lazy="formInputs.title">
        </FormComponent>
        <FormComponent label-for="activity-description-text" label-text="Description" warning-message="">
            <textarea name="description" class="form-input-element" id="activity-description-text" rows="5"
                v-model.lazy="formInputs.description"></textarea>
        </FormComponent>
        <FormComponent label-for="activity-category-input" label-text="Category" warning-message="">
            <input type="text" name="category" class="form-input-element" id="activity-category-input"
                v-model.lazy="formInputs.category">
        </FormComponent>
        <FormComponent label-for="activity-date-input" label-text="Event Date Time" warning-message="">
            <input type="datetime-local" name="date" class="form-input-element" id="activity-date-input"
                v-model.lazy="formInputs.beginDate">
        </FormComponent>
        <FormComponent label-for="activity-city-input" label-text="City" warning-message="">
            <input type="text" name="city" class="form-input-element" id="activity-city-input"
                v-model.lazy="formInputs.city">
        </FormComponent>
        <FormComponent label-for="activity-venue-input" label-text="Venue" warning-message="">
            <input type="text" name="venue" class="form-input-element" id="activity-venue-input"
                v-model.lazy="formInputs.venue">
        </FormComponent>
        <FormComponentContainer>
            <input type="submit" value="Submit" :class="{ disabled: isSubmitting }" :disabled="isSubmitting">
            <input type="button" value="Refresh" @click="emits('refresh-form')">
        </FormComponentContainer>
    </FormLayout>
</template>


<script setup lang="ts">
import FormLayout from "@/components/layout/form/FormLayout.vue";
import FormComponentContainer from "@/components/layout/form/FormComponentContainer.vue";
import FormComponent from "@/components/layout/form/FormComponent.vue";
import { DateToISOStringWithoutSeconds } from '@/utils/stateUndependentFunctions';
import type { Activity } from '@/models/Activity';
import { onMounted, reactive, type Ref, ref, watch, type UnwrapNestedRefs, type InjectionKey, inject, toRef, toRefs } from 'vue';
import type { SubmitResponse } from "@/models/auxillary/interfaces";
import { ScrollPageToTop } from '@/utils/stateUndependentFunctions'
import ResponseMessage from "@/components/layout/ResponseMessage.vue";


const props = defineProps<{
    submitResponse: SubmitResponse | null,
    activityToEdit?: Activity | null
}>();

const emits = defineEmits<{
    (e: 'refresh-form'): void
    (e: 'submit-form', activityObject: Activity): Promise<void>
}>();

const isSubmitting: Ref<boolean> = ref(false);
const response: UnwrapNestedRefs<SubmitResponse> = reactive({ isSuccessful: true, message: '', isResponded: false });
const formInputs = reactive({
    title: '',
    description: '',
    category: '',
    beginDate: '',
    city: '',
    venue: ''
});

onMounted(() => {
    fillForm();
});

watch(props, () => {
    fillForm();
    if (props.submitResponse) {
        response.isResponded = props.submitResponse.isResponded;
        response.isSuccessful = props.submitResponse.isSuccessful;
        response.message = props.submitResponse.message;
    }
});


const handleSubmitForm = async () => {
    isSubmitting.value = true;
    if (!isFormValid(formInputs)) {
        return;
    }

    const activityObject: Activity = {
        title: formInputs.title,
        description: formInputs.description,
        category: formInputs.category,
        beginDate: new Date(formInputs.beginDate),
        city: formInputs.city,
        venue: formInputs.venue
    }

    await emits('submit-form', activityObject);
    ScrollPageToTop();
}


const fillForm = () => {
    if (props.activityToEdit) {
        formInputs.title = props.activityToEdit.title;
        formInputs.description = props.activityToEdit.description;
        formInputs.category = props.activityToEdit.category;
        formInputs.beginDate = DateToISOStringWithoutSeconds(props.activityToEdit.beginDate);
        formInputs.city = props.activityToEdit.city;
        formInputs.venue = props.activityToEdit.venue;
    }
}

const isFormValid = (inputs: typeof formInputs) => {
    let isValid = true;

    if (inputs.title.trim() === '') {
        isValid = false;
    }

    if (inputs.description.trim() === '') {
        isValid = false;
    }

    if (inputs.city.trim() === '') {
        isValid = false;
    }

    if (inputs.category.trim() === '') {
        isValid = false;
    }

    if (inputs.beginDate === new Date(0).toString() || new Date(inputs.beginDate).toString() === 'Invalid Date') {
        isValid = false;
    }

    return isValid;
}

</script>


<style scoped>
.form-input-element {
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    outline: none;
    border-radius: 5px;
    border: 1px solid var(--light-gray-color);
    padding: 7px 10px;
}

.form-component>textarea {
    resize: none;
}

.form-component>label {
    font-size: 11pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    color: #3f3f3f;
    margin: 0 auto 3px 15px;
}

.form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}

input[type='button'],
input[type='submit'] {
    font-size: 12pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    font-weight: 600;
    color: #333131;
    outline: none;
    border: 1px solid #7b9ae1;
    border-radius: 7px;
    padding: 7px 0px;
}

input[type='button']:hover,
input[type='submit']:hover {
    border-color: #ade1ff;
}

input[type='button'] {
    background-color: #92d7ff;
}

input[type='submit'] {
    background-color: #b7ffe7;
}

input.disabled {
    background-color: #969696;
    border-color: #969696;
}
</style>
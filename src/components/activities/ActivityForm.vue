<template>
    <form class="card" @submit.prevent="handleSubmitForm">
        <div class="form-component">
            <label for="title">Title</label>
            <input type="text" name="title" class="form-input-element" id="activity-title-input"
                v-model.lazy="formInputs.title">
        </div>
        <div class="form-component">
            <label for="description">Description</label>
            <textarea name="description" class="form-input-element" id="activity-description-text" rows="5"
                v-model.lazy="formInputs.description"></textarea>
        </div>
        <div class="form-component">
            <label for="category">Category</label>
            <input type="text" name="category" class="form-input-element" id="activity-category-input"
                v-model.lazy="formInputs.category">
        </div>
        <div class="form-component">
            <label for="date">Date and Time</label>
            <input type="datetime-local" name="date" class="form-input-element" id="activity-date-input"
                v-model.lazy="formInputs.beginDate">
        </div>
        <div class="form-component">
            <label for="city">City</label>
            <input type="text" name="city" class="form-input-element" id="activity-city-input"
                v-model.lazy="formInputs.city">
        </div>
        <div class="form-component">
            <label for="venue">Venue</label>
            <input type="text" name="venue" class="form-input-element" id="activity-venue-input"
                v-model.lazy="formInputs.venue">
        </div>
        <div class="form-container">
            <input type="submit" value="Submit">
            <input type="button" value="Cancel" @click="emits('cancel-form')">
        </div>
    </form>
</template>


<script setup lang="ts">
import type { Activity } from '@/models/activity';
import { DeprecationTypes, onMounted, reactive, ref, type Ref } from 'vue';


const props = defineProps<{
    activityToEdit: Activity | undefined
}>();

const emits = defineEmits<{
    (e: 'cancel-form'): void
    (e: 'submit-form', activityObject: Activity): void
}>();

const isFormValid: Ref<boolean> = ref(true);

const formInputs = reactive({
    title: '',
    description: '',
    category: '',
    beginDate: '',
    city: '',
    venue: ''
});

let formProp: keyof typeof formInputs;

const handleSubmitForm = () => {
    if (!isFormValidated()) {
        return;
    }

    const activity: Activity = {
        title: formInputs.title,
        description: formInputs.description,
        category: formInputs.category,
        beginDate: new Date(formInputs.beginDate),
        city: formInputs.city,
        venue: formInputs.venue
    }


    emits('submit-form', activity);

    for (formProp in formInputs) {
        formInputs[formProp] = '';
    }
}

const isFormValidated = () => {
    let isSomeEmpty = false;

    for (formProp in formInputs) {
        if (formInputs[formProp].trim() === '') {
            isSomeEmpty = true;
        }
    }

    isFormValid.value = !isSomeEmpty;

    return !isSomeEmpty;
}

onMounted(() => {
    if (props.activityToEdit) {
        formInputs.title = props.activityToEdit.title;
        formInputs.description = props.activityToEdit.description;
        formInputs.category = props.activityToEdit.category;
        formInputs.beginDate = new Date(props.activityToEdit.beginDate).toISOString();
        formInputs.city = props.activityToEdit.city;
        formInputs.venue = props.activityToEdit.venue;
    }
});

</script>


<style scoped>
form {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    padding: 15px;
}

.form-component {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.form-input-element {
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    outline: none;
    border-radius: 5px;
    border: 1px solid #bebebe;
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
</style>
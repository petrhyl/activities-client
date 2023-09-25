<script setup lang="ts">
import FormLayout from "@/components/layout/form/FormLayout.vue";
import FormComponentContainer from "@/components/layout/form/FormComponentContainer.vue";
import FormComponent from "@/components/layout/form/FormComponent.vue";
import { DateToISOStringWithoutSeconds } from '@/utils/stateUndependentFunctions';
import type { Activity } from '@/models/Activity';
import { onMounted, reactive, type Ref, ref, watch, type ComputedRef, computed } from 'vue';
import type { SelectOption } from "@/models/auxillary/interfaces";
import { ScrollPageToTop } from '@/utils/stateUndependentFunctions'
import SelectComponent from "@/components/layout/form/SelectComponent.vue";
import { useActivityStore } from "@/stores/activities";
import { useRouter } from "vue-router";

enum FormActions {
    TITLE = 'title',
    DESC = 'description',
    CATEGORY = 'category',
    DATE = 'beginDate',
    CITY = 'city',
    VENUE = 'venue'
}

const emptyFormInputs = {
    title: {
        value: '',
        warning: '',
        isChanged: false,
        isValid: false
    },
    description: {
        value: '',
        warning: '',
        isChanged: false,
        isValid: false
    },
    category: {
        value: {
            id: '-1',
            value: '',
            text: '',
            isSelected: false
        },
        warning: '',
        isChanged: false,
        isValid: false
    },
    beginDate: {
        value: DateToISOStringWithoutSeconds(new Date()),
        warning: '',
        isChanged: false,
        isValid: false
    },
    city: {
        value: '',
        warning: '',
        isChanged: false,
        isValid: false
    },
    venue: {
        value: '',
        warning: '',
        isChanged: false,
        isValid: false
    }
};



const props = defineProps<{
    activityToEdit: Activity | null
}>();

const emits = defineEmits<{
    (e: 'submit-form', activity: Activity): Promise<void>
}>();

const store = useActivityStore();
const router = useRouter();


const isFormValid: Ref<boolean> = ref(false);
const isSubmitting: Ref<boolean> = ref(false);
const invalidMessage: Ref<string> = ref('');
const formInputs = reactive(emptyFormInputs);

const getCategoryOptions: ComputedRef<SelectOption[]> = computed(() => {
    if (store.getActivityCategories.length < 1) {
        return [];
    }

    let selectedId = props.activityToEdit?.category.id ?? -1;

    return store.getActivityCategories.map(category => {
        return {
            id: category.id,
            value: category.value,
            text: category.name,
            isSelected: category.id === selectedId
        }
    });
});

onMounted(async () => {
    await store.loadActivityCategories();
    fillForm();
});

watch(props, () => {
    fillForm();
});

watch(formInputs, () => {

});


// * * * * * not vue functions * * * * *

const handleChangeValue = (action: FormActions) => {
    switch (action) {
        case FormActions.TITLE:
            if (formInputs.title.value !== '') {
                formInputs.title.isChanged = true;
                formInputs.title.isValid = true;
                formInputs.title.warning = '';
            }
            break;
        case FormActions.CATEGORY:
            if (formInputs.category.value.value !== '' && formInputs.category.value.id !== '-1') {
                formInputs.category.isChanged = true;
                formInputs.category.isValid = true;
                formInputs.category.warning = '';
            }
            break;
        case FormActions.DESC:
            if (formInputs.description.value !== '') {
                formInputs.description.isChanged = true;
                formInputs.description.isValid = true;
                formInputs.description.warning = '';
            }
            break;
        case FormActions.DATE:
            if (formInputs.beginDate.value !== '') {
                formInputs.beginDate.isChanged = true;
                formInputs.beginDate.isValid = true;
                formInputs.beginDate.warning = '';
            }
            break;
        case FormActions.CITY:
            if (formInputs.city.value !== '') {
                formInputs.city.isChanged = true;
                formInputs.city.isValid = true;
                formInputs.city.warning = '';
            }
            break;
        case FormActions.VENUE:
            if (formInputs.venue.value !== '') {
                formInputs.venue.isChanged = true;
                formInputs.venue.isValid = true;
                formInputs.venue.warning = '';
            }
            break;
        default:
            break;
    }
}

const handleChangeCategoryValue = (selectedOption: SelectOption) => {
    formInputs.category.value = selectedOption;
    handleChangeValue(FormActions.CATEGORY);
}

const handleValidateComponent = (action: FormActions) => {
    switch (action) {
        case FormActions.TITLE:
            if (!/[a-z]{2}/i.test(formInputs.title.value) && formInputs.title.isChanged) {
                formInputs.title.isValid = false;
                formInputs.title.warning = 'The title has to contain at least three letters.'
            }
            break;
        case FormActions.CATEGORY:
            if ((formInputs.category.value.value === '' || formInputs.category.value.id === '-1') && formInputs.category.isChanged) {
                formInputs.category.isValid = false;
                formInputs.category.warning = 'Please, select the type.';
            }
            break;
        case FormActions.DESC:
            if (formInputs.description.value === '' && formInputs.description.isChanged) {
                formInputs.description.isValid = false;
                formInputs.description.warning = 'Please, provide some description.';
            }
            break;
        case FormActions.DATE:
            if ((formInputs.beginDate.value === new Date(0).toString() || new Date(formInputs.beginDate.value).toString() === 'Invalid Date') && formInputs.beginDate.isChanged) {
                formInputs.beginDate.isValid = false;
                formInputs.beginDate.warning = "Please, fill event's date and time correctly.";
            }
            break;
        case FormActions.CITY:
            if (!/[a-z]{2}/i.test(formInputs.city.value) && formInputs.city.isChanged) {
                formInputs.city.isValid = false;
                formInputs.city.warning = 'City of the event cannot be empty.';
            }
            break;
        case FormActions.VENUE:
            if (!/[a-z]{2}/i.test(formInputs.venue.value) && formInputs.venue.isChanged) {
                formInputs.venue.isValid = false;
                formInputs.venue.warning = 'Venue of the event cannot be empty.';
            }
            break;
        default:
            break;
    }
}

const validateForm = () => {
    let isAnyInvalid = false;
    handleChangeValue(FormActions.TITLE);
    handleChangeValue(FormActions.DESC);
    handleChangeValue(FormActions.DATE);
    handleChangeValue(FormActions.CITY);
    handleChangeValue(FormActions.VENUE);
    handleChangeValue(FormActions.CATEGORY);
    if (!formInputs.title.isValid) {
        isAnyInvalid = true;
    }    
    if (!formInputs.beginDate.isValid) {
        isAnyInvalid = true;
    }
    if (!(formInputs.category.value.value !== '')) {
        isAnyInvalid = true;
    }
    if (!formInputs.description.isValid) {
        isAnyInvalid = true;
    }
    if (!formInputs.city.isValid) {
        isAnyInvalid = true;
    }
    if (!formInputs.venue.isValid) {
        isAnyInvalid = true;
    }

    isFormValid.value = !isAnyInvalid;
}


const handleRefresh = () => {
    router.go(0);
}

const handleSubmitForm = async () => {
    isSubmitting.value = true;
    validateForm();
    if (!isFormValid.value) {
        isSubmitting.value = false;
        invalidMessage.value = 'Please, fill in all informations correctly.'
        return;
    }

    const activityObject: Activity = {
        title: formInputs.title.value,
        description: formInputs.description.value,
        category: {
            id: formInputs.category.value.id,
            value: formInputs.category.value.value,
            name: formInputs.category.value.text
        },
        beginDate: new Date(formInputs.beginDate.value),
        city: formInputs.city.value,
        venue: formInputs.venue.value
    }

    await emits('submit-form', activityObject);
    ScrollPageToTop();
}

const fillForm = () => {
    formInputs.title = emptyFormInputs.title;
    formInputs.description = emptyFormInputs.description;
    formInputs.category.value = emptyFormInputs.category.value;
    formInputs.beginDate = emptyFormInputs.beginDate;
    formInputs.city = emptyFormInputs.city;
    formInputs.venue = emptyFormInputs.venue;

    if (props.activityToEdit) {
        formInputs.title.value = props.activityToEdit.title;
        formInputs.description.value = props.activityToEdit.description;
        formInputs.category.value = {
            id: props.activityToEdit.category.id,
            value: props.activityToEdit.category.value,
            text: props.activityToEdit.category.name,
            isSelected: true
        };
        formInputs.beginDate.value = DateToISOStringWithoutSeconds(props.activityToEdit.beginDate);
        formInputs.city.value = props.activityToEdit.city;
        formInputs.venue.value = props.activityToEdit.venue;
    }
}

</script>


<template>
    <FormLayout @submit-form="handleSubmitForm" :form-styles="'card'" :invalid-message="invalidMessage">
        <FormComponent label-for="activity-title-input" label-text="Activity Title"
            :warning-message="formInputs.title.warning">
            <input
                type="text"
                name="activity-title-input"
                class="form-input-element"
                id="activity-title-input"
                v-model="formInputs.title.value"
                @input="handleChangeValue(FormActions.TITLE)"
                @blur="handleValidateComponent(FormActions.TITLE)">
        </FormComponent>
        <FormComponent label-for="activity-description-text" label-text="Description"
            :warning-message="formInputs.description.warning">
            <textarea
                name="activity-description-text"
                class="form-input-element"
                id="activity-description-text"
                rows="5"
                v-model="formInputs.description.value"
                @input="handleChangeValue(FormActions.DESC)"
                @blur="handleValidateComponent(FormActions.DESC)"></textarea>
        </FormComponent>
        <FormComponent label-for="activity-category-select" label-text="Category"
            :warning-message="formInputs.category.warning">
            <SelectComponent
                :css-class="'category-select'"
                :element-id="'activity-category'"
                :element-name="'activity-category'"
                :options="getCategoryOptions"
                @change-selected="handleChangeCategoryValue"
                @blur="handleValidateComponent(FormActions.CATEGORY)" />
        </FormComponent>
        <FormComponent label-for="activity-date-input" label-text="Event Date Time"
            :warning-message="formInputs.beginDate.warning">
            <input
                type="datetime-local"
                name="activity-date-input"
                class="form-input-element"
                id="activity-date-input"
                v-model="formInputs.beginDate.value"
                @input="handleChangeValue(FormActions.DATE)"
                @blur="handleValidateComponent(FormActions.DATE)">
        </FormComponent>
        <FormComponent label-for="activity-city-input" label-text="City"
            :warning-message="formInputs.city.warning">
            <input
                type="text"
                name="activity-city-input"
                class="form-input-element"
                id="activity-city-input"
                v-model="formInputs.city.value"
                @input="handleChangeValue(FormActions.CITY)"
                @blur="handleValidateComponent(FormActions.CITY)">
        </FormComponent>
        <FormComponent label-for="activity-venue-input" label-text="Venue" :warning-message="formInputs.venue.warning">
            <input
                type="text"
                name="activity-venue-input"
                class="form-input-element"
                id="activity-venue-input"
                v-model="formInputs.venue.value"
                @input="handleChangeValue(FormActions.VENUE)"
                @blur="handleValidateComponent(FormActions.VENUE)">
        </FormComponent>
        <FormComponentContainer>
            <input type="submit" value="Submit" :class="{ disabled: isSubmitting }" :disabled="isSubmitting">
            <input type="button" value="Refresh" @click="handleRefresh">
        </FormComponentContainer>
    </FormLayout>
</template>


<style>
.category-select {
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 10pt;
    border-radius: 5px;
    border: 1px solid var(--light-gray-color);
    padding: 7px 10px;
}
</style>

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
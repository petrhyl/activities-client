<template>
    <div class="about-component">
        <div class="header" v-if="isCurrentUser">
            <FormComponentContainer>
                <FormComponent
                    :class="'name-input'"
                    labelFor="about-dispalayedname"
                    :labelText="'Profile Name'"
                    :warningMessage="nameWarning">
                    <input
                        v-if="isEditing"
                        type="text"
                        class="form-input-element"
                        name="about-dispalayedname"
                        id="about-dispalayedname"
                        v-model="displayedNameInput"
                        @input="handleNameInput"
                        @blur="handleLeaveNameInput">
                    <div v-else
                        class="dispalayedname"
                        id="about-dispalayedname">
                        <span class="name">{{ displayedName }}</span>
                    </div>
                </FormComponent>
            </FormComponentContainer>
            <StyledButton
                :button-type="ButtonTypes.BUTTON"
                :text="getEditButtonText"
                :css-class="getEditButtonCss"
                :is-disabled="isUploading"
                @click-button="emits('start-edit')" />
        </div>

        <FormComponent labelFor="about-bio" labelText="Bio" :warningMessage="''">
            <textarea
                class="form-input-element"
                name="about-bio"
                id="about-bio"
                rows="7"
                v-model="contentInput"
                :disabled="!isEditing">
            </textarea>
        </FormComponent>
        <FormComponentContainer v-if="isEditing">
            <div></div>
            <StyledButton
                :buttonType="ButtonTypes.BUTTON"
                cssClass="confirm-btn"
                text="Save"
                @click-button="handleSave"
                :isDisabled="isSaving" />
        </FormComponentContainer>
    </div>
</template>


<script setup lang="ts">
import FormComponentContainer from '@/components/layout/form/FormComponentContainer.vue';
import FormComponent from "@/components/layout/form/FormComponent.vue";
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { ref, type Ref, watch, onBeforeMount, onUpdated, computed, type ComputedRef } from 'vue';
import { isNameValid } from "@/utils/inputValidation";
import type { AboutSection } from '@/models/User';


const props = defineProps<{
    displayedName: string,
    content: string,
    isEditing: boolean,
    isUploading: boolean,
    isCurrentUser: boolean
}>()

const emits = defineEmits<{
    (e: 'confirm-edit', aboutProfile: AboutSection): void,
    (e: 'start-edit'): void
}>()



const getEditButtonText: ComputedRef = computed(() => props.isEditing ? 'Cancel Edit' : 'Edit Informations')
const getEditButtonCss: ComputedRef = computed(() => props.isEditing ? 'cancel-btn' : 'confirm-btn')
const displayedNameInput: Ref<string> = ref(props.displayedName)
const isNameInputValid: Ref<boolean> = ref(true)
const nameWarning: Ref<string> = ref('')
const contentInput: Ref<string> = ref(props.content)
const isSaving: Ref<boolean> = ref(false)


const handleSave = () => {
    if (!isNameInputValid.value) {
        return
    }

    isSaving.value = true
    emits('confirm-edit', { displayName: displayedNameInput.value, bio: contentInput.value })
}

const handleNameInput = () => {
    if (displayedNameInput.value !== '') {
        if (isNameValid(displayedNameInput.value)) {
            nameWarning.value = ''
            isNameInputValid.value = true

            return
        }
    }

    isNameInputValid.value = false
}

const handleLeaveNameInput = () => {
    if (!isNameInputValid.value) {
        nameWarning.value = 'Please, fill valid name.'
    }
}


const fillInputs = () => {
    displayedNameInput.value = props.displayedName
    contentInput.value = props.content
}


watch(props, (curr, prev) => {
    if (curr.content !== prev.content) {
        contentInput.value = curr.content
    }
    if (curr.displayedName !== prev.displayedName) {
        displayedNameInput.value = curr.displayedName
    }

    isSaving.value = props.isUploading
})

onUpdated(() => {
    fillInputs()
})

onBeforeMount(() => {
    fillInputs()
})

</script>



<style scoped>
.about-component {
    padding-top: 5px;
}

.header {
    display: flex;
    justify-content: space-between;
}

.dispalayedname {
    padding: 3px 10px 0 10px;
}

.dispalayedname .name {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.about-component textarea {
    resize: none;
}
</style>
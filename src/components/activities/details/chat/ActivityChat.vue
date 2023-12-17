<script setup lang="ts">
import FormLayout from '@/components/layout/form/FormLayout.vue';
import ContributionComponent from './ContributionComponent.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import { ref, type Ref } from 'vue';
import CardLayout from '@/components/layout/base/CardLayout.vue';


const invalidMessage: Ref<string> = ref('');


const handleSubmit = () => {

}

</script>


<template>
    <CardLayout :header-text="'Chat about this event'" :use-padding="false">
        <div class="chat-content">
            <ul class="contributions">
                <li>
                    <ContributionComponent
                        :id="'4'"
                        :contributor-name="'d'"
                        :date-of-contibution="new Date()"
                        :message="'f'" />
                </li>
            </ul>
            <div class="comment">
                <FormLayout form-styles="form" :on-submit-form="handleSubmit" :invalid-message="invalidMessage">
                    <textarea class="text" rows="7"></textarea>
                    <StyledButton :css-class="'button-add'" :button-type="ButtonTypes.SUBMIT" :text="'Add Reply'"
                        @click-button="handleSubmit" />
                </FormLayout>
            </div>
        </div>
    </CardLayout>
</template>


<style scoped>

ul.contributions {
    list-style: none;
    padding: 0;
    margin: 15px;
}

.text {
    resize: none;
    margin-bottom: 15px;
    outline: none;
    border: 1px solid var(--light-gray-color);
    border-radius: 5px;
}
</style>

<style>
.button-add {
    background-color: var(--sky-color);
    width: fit-content;
}
</style>
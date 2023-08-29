<template>
    <h3 class="chat-title">Chat about this event</h3>
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
            <FormLayout form-styles="form" :on-submit-form="handleSubmit">
                <textarea class="text" rows="7"></textarea>
                <StyledButton :css-class="'button-add'" :button-type="ButtonTypes.SUBMIT" :text="'Add Reply'"
                    @click-button="handleSubmit" />
            </FormLayout>
        </div>
    </div>
</template>


<script setup lang="ts">
import FormLayout from '@/components/layout/form/FormLayout.vue';
import ContributionComponent from './ContributionComponent.vue';
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';


const handleSubmit = () => {

}

</script>


<style scoped>
.chat-title {
    width: 100%;
    text-align: center;
    font-family: 'Lucida Sans', Geneva, Verdana, sans-serif;
    color: var(--light-gold-color);
    background: var(--gradient-background);
    margin: 0;
    padding: 10px 0;
}

ul.contributions {
    list-style: none;
    padding: 0;
    margin: 15px 15px;
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
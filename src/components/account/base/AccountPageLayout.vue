<template>
    <div class="login-registration-page">
        <div class="link-to-registration-login-container">
            <span>{{ linkTitle }}</span>
            <StyledButton
                css-class="link-to-registration-login"
                :link-to="{ name: linkRouteName }"
                :button-type="ButtonTypes.LINK" :text="linkText" />
        </div>
        <slot></slot>
    </div>
</template>


<script setup lang="ts">
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';


const props = defineProps<{
    linkTitle: string,
    linkRouteName: string,
    linkText: string
}>();
</script>


<style>
.link-to-registration-login {
    background-color: #ecfffb;
    box-shadow: 0 0 4px 1px #00569c;
    color: #00569c;
}

.link-to-registration-login:hover {
    box-shadow: 0 0 4px 1px #0674ce;
    color: #0674ce;
}
</style>

<style scoped>
.link-to-registration-login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
    margin: auto auto 35px 15px;
}

.link-to-registration-login-container span {
    font-family: Verdana, Geneva, Tahoma, sans-serif, sans-serif;
}

.login-registration-page {
    width: 50%;
    margin: 5% auto auto auto;
}

@media screen and (max-width: 1200px) {
    .login-registration {
        width: 60%;
    }
}

@media screen and (max-width: 980px) {
    .login-registration {
        width: 70%;
    }
}

@media screen and (max-width: 670px) {
    .login-registration {
        width: 90%;
    }
}
</style>
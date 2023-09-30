<script setup lang="ts">
import PageContainer from '@/components/layout/base/PageContainer.vue';
import LoginForm from '@/components/users/LoginForm.vue';

</script>


<template>
    <PageContainer>
        <div class="login-page">
            <LoginForm />
        </div>
    </PageContainer>
</template>

<style>
.login-page {
    width: 50%;
    margin: 10% auto auto auto;
}

@media screen and (max-width: 1200px) {
    .login-page {
        width: 60%;
    }
}

@media screen and (max-width: 980px) {
    .login-page {
        width: 70%;
    }
}

@media screen and (max-width: 670px) {
    .login-page {
        width: 90%;
    }
}
</style>
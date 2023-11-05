<template>
    <PageContainer>
        <AccountPageLayout link-title="Don't you have an account yet? Go to" :link-route-name="RouteNames.REGISTERATION" link-text="Sign Up">
            <LoginForm />
        </AccountPageLayout>
    </PageContainer>
</template>


<script setup lang="ts">
import PageContainer from '@/components/layout/base/PageContainer.vue';
import AccountPageLayout from "@/components/account/base/AccountPageLayout.vue";
import LoginForm from '@/components/account/LoginForm.vue';
import RouteNames from '@/utils/constanses/RouteNames';


</script>


<style scoped></style>

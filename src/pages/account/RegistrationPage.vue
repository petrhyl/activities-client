<template>
    <PageContainer>
        <AccountPageLayout link-title="Do you already have an account? Go to" :link-route-name="RouteNames.LOGIN" link-text="Log In">
            <RegistrationForm />
        </AccountPageLayout>
    </PageContainer>
</template>


<script setup lang="ts">
import AccountPageLayout from "@/components/account/base/AccountPageLayout.vue";
import PageContainer from '@/components/layout/base/PageContainer.vue';
import RegistrationForm from '@/components/account/RegistrationForm.vue';
import RouteNames from '@/utils/constanses/RouteNames';


</script>


<style scoped>

</style>
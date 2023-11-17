<template>
    <PageContainer>
        <AccountPageLayout link-title="Do you already have an account? Go to" :link-route-name="RouteNames.LOGIN"
            link-text="Log In">
            <RegistrationForm v-if="!submitResponse.isResponded" @submit-form="handleCreateRegistration" :is-submitting="isSubmitting" />
            <ResponseMessage v-if="submitResponse.isResponded && !submitResponse.isSuccessful" :is-error="true" :message="submitResponse.message" />
        </AccountPageLayout>
    </PageContainer>
</template>


<script setup lang="ts">
import AccountPageLayout from "@/components/account/base/AccountPageLayout.vue";
import PageContainer from '@/components/layout/base/PageContainer.vue';
import ResponseMessage from "@/components/layout/ResponseMessage.vue";
import RegistrationForm from '@/components/account/RegistrationForm.vue';
import RouteNames from '@/utils/constanses/RouteNames';
import type { UserRegistration } from "@/models/User";
import { useUserStore } from "@/stores/user";
import type { SubmitResponse } from "@/models/auxillary/interfaces";
import { reactive, ref, type Ref } from "vue";
import { useRouter } from "vue-router";


const clearSubmitResponse = {
    isResponded: false,
    isSuccessful: true,
    message: ''
};

const userStore = useUserStore()
const router = useRouter()

const submitResponse: SubmitResponse = reactive(clearSubmitResponse)
const isSubmitting: Ref<boolean> = ref(false)

const handleCreateRegistration = async (user: UserRegistration): Promise<void> => {
    isSubmitting.value = true

    const response = await userStore.registerUser(user)

    submitResponse.isResponded = true;
    submitResponse.isSuccessful = response.isSuccessful
    submitResponse.message = response.errorMessage ?? 'Event was successfully created!';
    
    if (response.isSuccessful) {
        router.replace({ name: RouteNames.ACTIVITIES })
    }

    isSubmitting.value = false
}

</script>


<style scoped></style>
<template>
    <PageContainer>
        <AccountPageLayout link-title="Don't you have an account yet? Go to" :link-route-name="RouteNames.REGISTERATION"
            link-text="Sign Up">
            <ResponseMessage
                v-if="submitResponse.isResponded && !submitResponse.isSuccessful"
                :is-error="true"
                :message="submitResponse.message" />
            <LoginForm @submit-form="handleLoginUser" :is-submitting="isSubmitting" />
        </AccountPageLayout>
    </PageContainer>
</template>


<script setup lang="ts">
import PageContainer from '@/components/layout/base/PageContainer.vue';
import AccountPageLayout from "@/components/account/base/AccountPageLayout.vue";
import LoginForm from '@/components/account/LoginForm.vue';
import RouteNames from '@/utils/constanses/RouteNames';
import type { Login } from '@/models/User';
import type { SubmitResponse } from '@/models/auxillary/interfaces';
import { useUserStore } from '@/stores/user';
import { onBeforeMount, reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import ResponseMessage from '@/components/layout/base/ResponseMessage.vue';
import { useFetchUserStore } from '@/stores/fetchingUser';


const clearSubmitResponse = {
    isResponded: false,
    isSuccessful: true,
    message: ''
};

const userStore = useUserStore()
const fetchUserStore = useFetchUserStore()
const router = useRouter()

const submitResponse: SubmitResponse = reactive(clearSubmitResponse)
const isSubmitting: Ref<boolean> = ref(false)


const handleLoginUser = async (login: Login): Promise<void> => {
    isSubmitting.value = true

    const response = await fetchUserStore.loginUser(login)

    submitResponse.isResponded = true;
    submitResponse.isSuccessful = response.isSuccessful
    submitResponse.message = response.errorMessage ?? 'Event was successfully created!';

    if (response.isSuccessful) {
        router.replace({ name: RouteNames.ACTIVITIES })
    }

    isSubmitting.value = false
}

onBeforeMount(() => {
    if (userStore.isLoggedIn) {
        router.replace({ name: RouteNames.USER_PROFILE, params: { username: userStore.getCurrentUsername } })
    }
})

</script>


<style scoped></style>

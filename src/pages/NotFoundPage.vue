<template>
    <PageContainer>
        <div class="not-found">
            <ResponseMessage message="The page you want to visit does not exist." :is-error="true" />
            <p>Try to go to our home page&nbsp;&nbsp;-->&nbsp;<RouterLink to="/">&nbsp;Here...</RouterLink>
            </p>
        </div>
    </PageContainer>
</template>


<script setup lang="ts">
import PageContainer from "@/components/layout/base/PageContainer.vue";
import ResponseMessage from "@/components/layout/base/ResponseMessage.vue";
</script>


<style scoped>
.not-found {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    text-align: center;
    row-gap: 50px;
    margin-top: 10%;
}

.not-found>p {
    font-size: 14pt;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: #2b2b2b;
}

.not-found a {
    font-size: 16pt;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    color: #00004b;
}
</style>
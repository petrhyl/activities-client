<script setup lang="ts">
import PageContainer from '@/components/layout/base/PageContainer.vue';
import RouteNames from "@/utils/constanses/RouteNames";
import StyledButton from '@/components/layout/form/StyledButton.vue';
import ButtonTypes from '@/utils/constanses/ButtonTypes';

</script>


<template>
    <PageContainer>
        <div class="home-page">
            <div class="home-title-container">
                <div class="img-background">
                    <div></div>
                </div>
                <h1 class="home-title">Activities</h1>
            </div>
            <h1 class="welcome-title">Welcome to Activities</h1>
            <div class="link-container">
                <StyledButton :button-type="ButtonTypes.LINK" :link-to="{ name: RouteNames.ACTIVITIES }"
                    :text="'Visit all activities'" :css-class="'home-page-activities'" />
                <StyledButton :button-type="ButtonTypes.LINK" :link-to="{ name: RouteNames.LOGIN }" :text="'Log in'"
                    :css-class="'home-page-login'" />
            </div>
        </div>
    </PageContainer>
</template>


<style>
.home-page-activities {
    background-color: #ecfffb;
    box-shadow: 0 0 4px 1px #00569c;
    color: #00569c;
}

.home-page-activities:hover{
    box-shadow: 0 0 4px 1px #0674ce;
    color: #0674ce;
}

.home-page-login{
    background-color: var(--blue-color);
    box-shadow: 0 0 4px 1px #00569c;
    color: #ecfffb;
}

.home-page-login:hover{
    background-color: #1691d8;
    box-shadow: 0 0 4px 1px #0674ce;
}
</style>

<style scoped>
.home-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15% auto auto auto;
}

.home-title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.img-background {
    height: 44pt;
    width: 62pt;
    -webkit-mask-image: url('@/assets/logo.png');
    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-image: url('@/assets/logo.png');
    mask-size: contain;
    mask-repeat: no-repeat;
    margin-right: 20px;
}

.img-background>div {
    width: 100%;
    height: 100%;
    background-color: var(--azure-color);
}

.home-title {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40pt;
    font-weight: 800;
    letter-spacing: 2px;
    color: transparent;
    background: linear-gradient(110deg, var(--blue-color), var(--azure-color));
    -webkit-background-clip: text;
    background-clip: text;
}

.welcome-title {
    color: var(--blue-color);
    margin-bottom: 20px;
}

.link-container {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
</style>
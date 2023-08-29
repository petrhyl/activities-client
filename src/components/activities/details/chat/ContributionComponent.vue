<template>
    <RowWithImageIcon :image-width="50" image-source="/src/assets/user.png" image-alternative-text="user">
        <div class="contribution-content">
            <div>
                <span>{{ contributorName }}</span>
                <span>{{ DateTimeToCzechFormat(dateOfContibution) }}</span>
            </div>
            <div>
                {{ message }}
            </div>
            <button @click="emits('on-reply', id)">Reply</button>
        </div>
    </RowWithImageIcon>
</template>


<script setup lang="ts">
import RowWithImageIcon from '@/components/layout/RowWithImageIcon.vue';
import { DateTimeToCzechFormat } from '@/utils/stateUndependentFunctions';


const props = defineProps<{
    id: string,
    contributorName: string,
    dateOfContibution: Date,
    message: string,
}>();

const emits = defineEmits<{
    (e: 'on-reply', contributionId: string): void
}>();
</script>


<style scoped></style>
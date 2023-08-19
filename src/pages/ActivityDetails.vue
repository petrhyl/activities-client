<template>
    <LoadingComponent v-if="!isLoaded" />
    <div class="card activity-detail" ref="detailElement">
        <div>
            <img v-if="getActivity" :src="getImageLocation" alt="category">
            <h2>{{ getActivity?.title }}</h2>
            <div class="date">{{ activityDateTimeString }}</div>
            <div>{{ getActivity?.city }}</div>
            <div>{{ getActivity?.venue }}</div>
            <p>category: {{ getActivity?.category }}</p>
            <p>{{ getActivity?.description }}</p>
        </div>
        <div class="detail-footer">
            <button @click="handleEdit" :disabled="isSubmittingData">Edit</button>
            <button @click="handleCancelShow">Cancel</button>
        </div>
    </div>
    <p v-if="errorMessage !== ''" class="error-message">{{ errorMessage }}</p>
    <ActivityForm
        v-if="isFormVisible"
        @cancel-form="handleCancelEdit"
        @submit-form="handleSubmitEdit"
        :activity-to-edit="getActivity"
        :is-submitting="isSubmittingData" />
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/ActivityForm.vue';
import LoadingComponent from '@/components/layout/LoadingComponent.vue';
import type { Activity } from '@/models/Activity';
import { useActivityStore } from '@/stores/activities';
import { storeToRefs } from 'pinia';
import { ref, type ComputedRef, type Ref, computed, onBeforeMount, watch, inject } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    activityId: string
}>();

const router = useRouter();
const activityStore = useActivityStore();

const { getActivity } = storeToRefs(activityStore);
const isFormVisible: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');
const isLoaded: Ref<boolean> = ref(false);
const isSubmittingData: Ref<boolean> = ref(false);

const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${getActivity.value?.category}.jpg`;
});
const activityDateTimeString: ComputedRef<string> = computed(() => {
    let d: Date;
    if (getActivity.value?.beginDate) {
        d = new Date(getActivity.value?.beginDate);

        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    }

    return '';
})

watch(props, async (current) => {
    isLoaded.value = false;
    handleCancelEdit();
    loadActivity(current.activityId)
});

onBeforeMount(async () => {
    await loadActivity(props.activityId);
});

const refreshList = inject('refreshList') as () => {};


const loadActivity = async (id: string) => {
    errorMessage.value = '';
    const response = await activityStore.loadSingleActivity(id);
    if (!response.isSuccessful && response.errorMessage) {
        errorMessage.value = response.errorMessage;
    }

    isLoaded.value = true;
}

const isFormValid = (activityObject: Activity) => {
    let isValid = true;

    if (activityObject.title.trim() === '') {
        isValid = false;
    }

    if (activityObject.description.trim() === '') {
        isValid = false;
    }

    if (activityObject.city.trim() === '') {
        isValid = false;
    }

    if (activityObject.category.trim() === '') {
        isValid = false;
    }

    if (activityObject.beginDate === new Date(0) || new Date(activityObject.beginDate).toString() === 'Invalid Date') {
        isValid = false;
    }

    return isValid;
}

const detailElement = ref<HTMLDivElement | null>();

const handleEdit = () => {
    isFormVisible.value = true;
    if (detailElement.value) {
        window.scrollTo({ top: detailElement.value.scrollHeight + 70, behavior: 'smooth' });
    }
}

const handleCancelShow = () => {
    router.push('/activities');
}

const handleCancelEdit = () => {
    isFormVisible.value = false;
}

const handleSubmitEdit = async (activityObject: Activity) => {
    isSubmittingData.value = true;

    if (isFormValid(activityObject)) {
        activityObject.id = props.activityId;

        let response = await activityStore.updateActivity(activityObject);
        if (!response.isSuccessful && response.errorMessage) {
            errorMessage.value = response.errorMessage;

            return;
        }

        refreshList();

        loadActivity(props.activityId);

        if (errorMessage.value !== '') {
            return;
        }

        isFormVisible.value = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    isSubmittingData.value = false;
}

</script>


<style scoped>
img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.activity-detail {
    position: relative;
}

.detail-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

button {
    font-size: 13pt;
    font-weight: 600;
    color: #262525;
    outline: none;
    border: 1px solid #7b9ae1;
    padding: 7px 0;
}

button:first-child {
    background-color: #b7ffe7;
    border-right-width: 1px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

button:last-child {
    background-color: #92d7ff;
    border-left-width: 1px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

button:hover {
    border-color: #ade1ff;
}

button:active {
    outline: none;
}

.error-message {
    font-size: 13pt;
    font-weight: 600;
    text-align: center;
    color: #98002b;
}
</style>
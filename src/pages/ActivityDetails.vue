<template>
    <div class="card" ref="detailElement">
        <div>
            <img v-if="activity" :src="getImageLocation" alt="category">
            <h2>{{ activity?.title }}</h2>
            <div class="date">{{ activityDateTimeString }}</div>
            <p>{{ activity?.description }}</p>
        </div>
        <div class="detail-footer">
            <button @click="handleEdit">Edit</button>
            <button @click="handleCancelShow">Cancel</button>
        </div>
    </div>
    <p v-if="errorMessage !== ''" class="error-message">{{ errorMessage }}</p>
    <ActivityForm v-if="isFormVisible" @cancel-form="handleCancelEdit" @submit-form="handleSubmitEdit" :activity-to-edit="activity" />
</template>


<script setup lang="ts">
import ActivityForm from '@/components/activities/ActivityForm.vue';
import type { Activity } from '@/models/activity';
import { ref, type ComputedRef, type Ref, computed, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    activityId: string
}>();

const router = useRouter();

const activity: Ref<Activity | undefined> = ref();
const isFormVisible: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');

const getImageLocation: ComputedRef<string> = computed(() => {
    return `/src/assets/categoryImages/${activity.value?.category}.jpg`;
});
const activityDateTimeString: ComputedRef<string> = computed(()=>{
    let d: Date;
    if (activity.value?.beginDate) {
        d = new Date(activity.value.beginDate);

        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    }

    return '';
})

watch(props, async (current) => {
    await fetchData(current.activityId);
});


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
    await updatedActivityOnServer(activityObject);
}

const fetchData = async (activityId: string) => {
    fetch(`https://localhost:5000/api/activities/${activityId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Cannot load the activity details!');
            }

            return res.json();
        })
        .then(data => {
            activity.value = data;
        })
        .catch((err) => {
            errorMessage.value = err && err.message !== '' ? err.message : 'The activity details could not be loaded!';
        });
};

const updatedActivityOnServer = async (activityObject: Activity) => {
    activityObject.id = props.activityId;
    console.log(activityObject);
    fetch(`https://localhost:5000/api/activities/${props.activityId}`, {
        method: 'PUT',
        body: JSON.stringify(activityObject),
        headers: {
            'content-type': 'application/json'
        }
    }).then(async res => {
        if (!res.ok) {
            throw new Error('The activity could not be updated!');
        }

        await fetchData(props.activityId);
    }).catch((err) => {
        errorMessage.value = err && err.message !== '' ? err.message : 'The activity could not be updated!';
    });
}

onBeforeMount(async () => {
    await fetchData(props.activityId);
});

</script>


<style scoped>
img {
    width: 100%;
    height: auto;
    border-radius: 5px;
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

.error-message{
    font-size: 13pt;
    font-weight: 600;
    text-align: center;
    color: #98002b;
}
</style>
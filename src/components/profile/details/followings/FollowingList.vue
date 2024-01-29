<template>
    <ul>
        <li v-for="following in followings">
            <CardLayout>
                <FollowingItem
                    :profile="following"
                    @unfollow="handleUnfollow"
                    @remove-follower="handleRemoveFollower" />
            </CardLayout>
        </li>
    </ul>
</template>



<script setup lang="ts">
import { type Profile } from "@/models/User";
import FollowingItem from "./FollowingItem.vue";
import CardLayout from "@/components/layout/base/CardLayout.vue";


const props = defineProps<{
    followings: Profile[]
}>()

const emits = defineEmits<{
    (e: 'unfollow', username: string): void,
    (e: 'remove-follower', username: string): void
}>()

const handleUnfollow = (username: string) => {
    emits('unfollow', username)
}

const handleRemoveFollower = (username: string) => {
    emits('remove-follower', username)
}
</script>



<style scoped></style>
<template>
    <ul class="following-list">
        <li v-for="following in followings">
            <CardLayout :use-padding="false">
                <FollowingItem
                    :profile="following"
                    @unfollow="handleUnfollow"
                    @remove-follower="handleRemoveFollower"
                    @follow="handleFollow" />
            </CardLayout>
        </li>
    </ul>
</template>



<script setup lang="ts">
import { type Profile } from "@/models/User";
import FollowingItem from "./FollowingItem.vue";
import CardLayout from "@/components/layout/base/CardLayout.vue";
import { WindowWidth } from "@/utils/constanses/enums";
import { type ComputedRef, computed, inject } from "vue";
import { keyProvidedWindowWidth } from "@/utils/providedKey";


const props = defineProps<{
    followings: Profile[]
}>()

const emits = defineEmits<{
    (e: 'unfollow', username: string): void,
    (e: 'follow', username: string): void,
    (e: 'remove-follower', username: string): void
}>()


const windowWidth = inject(keyProvidedWindowWidth)

const getItemWidth: ComputedRef<string> = computed(() => {
    const gap = 20
    switch (windowWidth?.value) {
        case WindowWidth.PHONE:
            return `50% - ${gap / 2}px`
        case WindowWidth.TABLET:
            return `25% - ${Math.round(gap / 4)}px`
        case WindowWidth.SMALL:
            return `20% - ${gap / 5}px`
        case WindowWidth.LARGE:
            return `14% - ${Math.round(gap / 7)}px`
        case WindowWidth.SUPER_LARGE:
            return `12.5% - ${Math.round(gap / 8)}px`
        default:
            return `16% - ${gap / 6}px`
    }
})


const handleUnfollow = (username: string) => {
    emits('unfollow', username)
}

const handleFollow =  (username: string) => {
    emits('follow', username)
}

const handleRemoveFollower = (username: string) => {
    emits('remove-follower', username)
}
</script>



<style scoped>
.following-list {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.following-list li {
    width: calc(v-bind(getItemWidth));
}
</style>
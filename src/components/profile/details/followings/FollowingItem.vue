<template>
   <div class="follower-container">
      <div class="image-container">
         <OptionsComponent
            v-if="getCurrentUsername !== profile.username"
            :popup-id-sufix="profile.username"
            class="options">
            <div class="options-items">
               <input
                  v-if="isFollowed"
                  type="button"
                  value="Unfollow"
                  @click="handleFollow(profile.username)">
               <input
                  v-else
                  type="button"
                  value="Follow"
                  @click="handleUnfollow(profile.username)">
               <input
                  v-if="isFollowing"
                  type="button"
                  value="Remove Follower"
                  @click="handleRemoveFollower(profile.username)">
            </div>
         </OptionsComponent>
         <RouterLink :to="{ name: RouteNames.USER_PROFILE, params: { username: profile.username } }">
            <ImageComponent
               :alternative-image-text="'profile photo'"
               :image-url="profile.imageUrl"
               :image-css="'image'"
               :use-alternative-element="true">
               <img src="@/assets/user.png" alt="profile photo" class="image">
            </ImageComponent>
         </RouterLink>
      </div>
      <div class="profile-info">
         <div class="name">
            {{ profile.displayName }}
         </div>
         <div class="indicators">
            <div v-if="isFollowing" class="is-following">
               <RowWithImageIcon
                  :image-alternative-text="'following'"
                  :image-source="'/src/assets/star-azur.png'"
                  :image-width="15"
                  :image-margin="15">
                  <span>
                     Following
                  </span>
               </RowWithImageIcon>
            </div>
            <div v-if="isFollowed" class="is-followed">
               <RowWithImageIcon
                  :image-alternative-text="'followed'"
                  :image-source="'/src/assets/star-light-green.png'"
                  :image-width="15"
                  :image-margin="15">
                  <span>
                     Followed
                  </span>
               </RowWithImageIcon>
            </div>
         </div>
      </div>
   </div>
</template>



<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import OptionsComponent from '@/components/layout/OptionsComponent.vue';
import RowWithImageIcon from "@/components/layout/RowWithImageIcon.vue";
import type { Profile } from '@/models/User';
import type { ModalState } from '@/models/auxillary/interfaces';
import { useUserStore } from '@/stores/user';
import RouteNames from '@/utils/constanses/RouteNames';
import { ModalInState } from '@/utils/objects/ModalInState';
import { keyProvidedModalState } from '@/utils/providedKey';
import { storeToRefs } from 'pinia';
import { inject, ref, type Ref } from 'vue';


const props = defineProps<{
   profile: Profile
}>()

const emits = defineEmits<{
   (e: 'unfollow', username: string): void,
   (e: 'follow', username: string): void,
   (e: 'remove-follower', username: string): void
}>()


const { getCurrentUsername } = storeToRefs(useUserStore())

const isFollowed: Ref<boolean> = ref(props.profile.isFollowedByCurrentUser)
const isFollowing: Ref<boolean> = ref(props.profile.isFollowingCurrentUser)

const { setCloseModal } = inject<ModalState>(keyProvidedModalState, { modalInState: new ModalInState(), setOpenModal: () => { }, setCloseModal: () => { } })


const handleUnfollow = (username: string) => {
   setCloseModal()
   emits('unfollow', username)
}

const handleFollow = (username: string) => {
   setCloseModal()
   emits('follow', username)
}

const handleRemoveFollower = (username: string) => {
   setCloseModal()
   emits('remove-follower', username)
}
</script>



<style scoped>
.image-container {
   position: relative;
}

.image {
   width: 100%;
}

.image,
.image-container:deep() .image {
   border-top-right-radius: 5px;
   border-top-left-radius: 5px;
}

.image-container:deep() .options {
   top: 8px;
   right: 8px;
}

.is-followed,
.is-following {
   font-family: Verdana, Geneva, sans-serif;
   font-size: 11pt;
}

.is-followed span {
   color: #00e9b2;
}

.is-following span {
   color: var(--azure-color);
}

.profile-info {
   height: 90px;
   min-height: 90px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 10px 15px;
}

.profile-info .name {
   font-family: 'Gill Sans', Calibri, sans-serif;
   font-size: 13pt;
}

.indicators {
   display: flex;
   flex-direction: column;
   row-gap: 3px;
}

.options-items {
   display: flex;
   flex-direction: column;
   row-gap: 2px;
   background-color: #fcffeacc;
   box-shadow: 0 0 3px 2px #fcffeacc;
   padding: 2px;
}

.options-items input {
   width: 100%;
   text-align: start;
   background-color: transparent;
   border: none;
   outline: none;
   cursor: pointer;
   padding: 7px;
}

.options-items input:hover {
   text-shadow: 0 0 1px var(--dark-blue-color);
}
</style>
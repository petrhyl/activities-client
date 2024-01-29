<template>
   <div class="follower-container">
      <div class="follower-card">
         <div class="image">
            <ImageComponent
               :alternative-image-text="'profile photo'"
               :image-url="profile.imageUrl"
               :image-css="''">
               <img src="@/assets/logo.png" alt="profile photo">
            </ImageComponent>
         </div>
      </div>
   </div>
</template>



<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import type { Profile } from '@/models/User';


const props = defineProps<{
   profile: Profile
}>()

const emits = defineEmits<{
   (e: 'unfollow', username: string): void
   (e: 'remove-follower', username: string): void
}>()
</script>



<style scoped>
.follower-container {
   height: 250px;
}
</style>
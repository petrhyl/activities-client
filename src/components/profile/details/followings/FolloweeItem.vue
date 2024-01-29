<template>
   <div class="followee-container">
      <div>

      </div>
   </div>
</template>



<script setup lang="ts">
import type { Profile } from '@/models/User';


const props = defineProps<{
   profile: Profile
}>()

const emits = defineEmits<{
   (e: 'unfollow', username: string): void
}>()
</script>



<style scoped></style>
import type { User } from "@/models/User";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useUserStore = defineStore('userStore', () =>{
    const user: Ref<User | undefined> = ref();


});
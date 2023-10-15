import type { Login, User } from "@/models/User";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useUserStore = defineStore('userStore', () =>{
    const user: Ref<User | undefined> = ref();


    const login =async (login: Login) => {
        
    }
    // * * * * * non-vue * * * * *
    
    
});
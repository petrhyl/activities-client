import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from "@/router/index";

import App from './App.vue'
import RouteNames from './utils/constanses/RouteNames';
import { useUserStore } from './stores/user';
import { useFetchUserStore } from "./stores/fetchingUser";

const app = createApp(App)

app.use(createPinia())
app.use(router)

router.beforeEach((to, _, next) => {
    let isMatched = false
    const userStore = useUserStore()
    const fetchUserStore = useFetchUserStore()

    to.matched.forEach((el) => {
        if (el.name === RouteNames.CREATE_ACTIVITY
            || el.name === RouteNames.EDIT_ACTIVITY
            || el.name === RouteNames.USER_PROFILE) {
            isMatched = true
        }
    })

    if (isMatched) {
        if (!userStore.isLoggedIn) {
            next({ name: RouteNames.LOGIN })
            
            return
        }
    }

    let isTimeToRefreshToken = false 

    if (userStore.getLastFetchingDate) {
        let hours = new Date(userStore.getLastFetchingDate).getHours()
        hours = hours >= 22 ? 0 : hours + 2
        isTimeToRefreshToken = hours === new Date().getHours()
    }

    if (userStore.isLoggedIn && isTimeToRefreshToken) {
        console.log('refresh token');
        
        fetchUserStore.loadCurrentUserWithRefreshedToken()
      }

    next()
})

app.mount('#app')

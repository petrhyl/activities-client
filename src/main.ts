import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from "@/router/index";

import App from './App.vue'
import RouteNames from './utils/constanses/RouteNames';
import { useUserStore } from './stores/user';

const app = createApp(App)

app.use(createPinia())
app.use(router)

router.beforeEach((to, _, next) => {
    let isMatched = false

    to.matched.forEach((el) => {
        if (el.name === RouteNames.CREATE_ACTIVITY
            || el.name === RouteNames.EDIT_ACTIVITY
            || el.name === RouteNames.USER_PROFILE) {
            isMatched = true
        }
    })

    if (isMatched) {
        const userStore = useUserStore()
        if (!userStore.isLoggedIn) {
            next({ name: RouteNames.LOGIN })
            
            return
        }
    }

    next()
})

app.mount('#app')

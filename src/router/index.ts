import { createRouter, createWebHistory } from "vue-router";
import Activities from "@/pages/Activities.vue";


export const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            redirect: '/activities'
        },{
            path: '/activities',
            component: Activities,
            children:[
                {
                    path: ':activityId',
                    props: true,
                    component: () => import('@/pages/ActivityDetails.vue')
                }
            ]
        },{
            path: '/create-new',
            component: () => import('@/pages/CreateActivity.vue')
        }
    ]
});

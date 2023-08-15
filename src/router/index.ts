import { createRouter, createWebHistory } from "vue-router";
import Activities from "@/pages/Activities.vue";
import RouteNames from "./routeNames";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'activities' }
        }, {
            path: '/activities',
            name: 'activities',
            component: Activities,
            children: [
                {
                    path: ':activityId',
                    name: 'activityDetail',
                    props: true,
                    component: () => import('@/pages/ActivityDetails.vue')
                }
            ]
        }, {
            path: '/create-new',
            name: 'createActivity',
            component: () => import('@/pages/CreateActivity.vue')
        }
    ],
    scrollBehavior(to, position) {
        const endpointRouteName = to.name;
        console.log(endpointRouteName);
        if (endpointRouteName && endpointRouteName === RouteNames.ACTIVITY_DETAIL) {
            return { left: 0, top: 0, behavior: "smooth" };
        }
    }
});

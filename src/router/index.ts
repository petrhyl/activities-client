import { createRouter, createWebHistory } from "vue-router";
import Activities from "@/pages/Activities.vue";
import RouteNames from "@/utils/constanses/RouteNames";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'activities' }
        }, {
            path: '/activities',
            name: RouteNames.ACTIVITIES,
            component: Activities,
            children: [
                {
                    path: ':activityId',
                    name: RouteNames.ACTIVITY_DETAIL,
                    props: true,
                    component: () => import('@/pages/ActivityDetails.vue')
                }
            ]
        },{
            path: '/create-new',
            name: RouteNames.CREATE_ACTIVITY,
            component: () => import('@/pages/CreateActivity.vue')
        }
    ],
    scrollBehavior(to, position) {
        const endpointRouteName = to.name;
        if (endpointRouteName && endpointRouteName === RouteNames.ACTIVITY_DETAIL) {
            return { left: 0, top: 0, behavior: "smooth" };
        }
    }
});

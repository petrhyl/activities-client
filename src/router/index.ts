import { createRouter, createWebHistory } from "vue-router";
import Activities from "@/pages/activities/ActivitiesPage.vue";
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
            component: Activities
        },{
            path: '/activities/:activityId',
            name: RouteNames.ACTIVITY_DETAIL,
            props: true,
            component: () => import('@/pages/activities/ActivityDetailsPage.vue')                   
        },{
            path: '/activities/create-new',
            name: RouteNames.CREATE_ACTIVITY,
            component: () => import('@/pages/activities/CreateActivityPage.vue')
        },{
            path: '/activities/edit/:activityId',
            name: RouteNames.EDIT_ACTIVITY,
            props: true,
            component: () => import('@/pages/activities/EditActivityPage.vue')
        }
    ],
    scrollBehavior(to, position) {
        const endpointRouteName = to.name;
        if (endpointRouteName && endpointRouteName === RouteNames.ACTIVITY_DETAIL) {
            return { left: 0, top: 0, behavior: "smooth" };
        }
    }
});

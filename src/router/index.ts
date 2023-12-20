import { createRouter, createWebHistory } from "vue-router";
import RouteNames from "@/utils/constanses/RouteNames";
import HomePage from "@/pages/HomePage.vue";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: RouteNames.HOME,
            component: HomePage
        }, {
            path: '/activities',
            name: RouteNames.ACTIVITIES,
            component: () => import('@/pages/activities/ActivitiesPage.vue')
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
        },{
            path: '/account/login',
            name: RouteNames.LOGIN,
            component: () => import('@/pages/account/LoginPage.vue')
        },{
            path: '/account/registration',
            name: RouteNames.REGISTERATION,
            component: () => import('@/pages/account/RegistrationPage.vue')
        },{
            path: '/account/profile/:username',
            name: RouteNames.USER_PROFILE,
            props: true,
            component: () => import('@/pages/account/ProfilePage.vue'),            
        },{
            path: '/:notFound(.*)',
            name: RouteNames.NOT_FOUND,
            component: () => import('@/pages/NotFoundPage.vue')
        }
    ],
    scrollBehavior(to, position) {
        const endpointRouteName = to.name;
        if (endpointRouteName && endpointRouteName === RouteNames.ACTIVITY_DETAIL) {
            return { left: 0, top: 0, behavior: "smooth" };
        }
    }
});
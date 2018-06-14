import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';

// Views - Pages
import Page404 from '@/views/errorPages/Page404';
import Page500 from '@/views/errorPages/Page500';

/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    {path: '/login', component: Login, hidden: true},
    {
        path: '/pages', redirect: '/pages/p404', name: 'Pages',
        component: {
            render(c) {
                return c('router-view');
            },
            // Full,
        },
        children: [
            {path: '404', name: 'Page404', component: _import('errorPages/Page404')},
            {path: '500', name: 'Page500', component: _import('errorPages/Page404')},
        ],
    },

];

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap,
});

export const asyncRouterMap = [

    {
        path: '/',
        redirect: '/dashboard',
        name: '首页',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/dashboard',
                name: '主页',
                icon: 'speedometer',
                component: _import('Dashboard'),
            },
            {
                path: '/application',
                name: '申请',
                icon: 'ios-clock-outline',
                component: _import('Application'),
            },
            {
                path: '/attendance',
                name: '出勤统计',
                icon: 'ios-list-outline',
                component: _import('Attendance'),
            },
        ],

    },

    {path: '*', redirect: '/pages/404', hidden: true},

];

export const adminRouterMap = [

    {
        path: '/',
        redirect: '/allUsers',
        name: '首页',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/allUsers',
                name: '查看所有用户',
                icon: 'speedometer',
                component: _import('AllUsers'),
                meta: {role: ['admin']},
            },
            {
                path: '/addUsers',
                name: '添加用户',
                icon: 'ios-list-outline',
                component: _import('AddUsers'),
                meta: {role: ['admin']},
            },
            {
                path: '/userInfo',
                name: '出勤记录',
                icon: 'ios-paper',
                component: _import('UserInfo'),
                hidden: true,
                meta: {role: ['admin']},
            },
            {
                path: '/allApplications',
                name: '申请记录',
                icon: 'ios-paper',
                component: _import('AllApplications'),
                meta: {role: ['admin']},
            },
        ],

    },

    {path: '*', redirect: '/pages/404', hidden: true},

];

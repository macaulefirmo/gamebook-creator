import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateProject from '../views/CreateProject.vue';
import ListProject from '../views/ListProject.vue';
import About from '../views/About.vue';
import Help from '../views/Help.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/project',
        name: 'Project',
        children: [
            {
                path: '/project/create',
                name: 'CreateProject',
                component: CreateProject,
            },
            {
                path: '/project/list',
                name: 'ListProject',
                component: ListProject,
            },
        ],
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/help',
        name: 'Help',
        component: Help,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

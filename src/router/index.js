import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '@/store/components/main';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Help from '../views/Help.vue';

import CreateProject from '../views/project/CreateProject.vue';
import ListProject from '../views/project/ListProject';
import UpdateProject from '../views/project/UpdateProject';
import FinishProject from '../views/project/FinishProject';

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
            {
                path: '/project/update/:id',
                name: 'UpdateProject',
                component: UpdateProject,
            },
            {
                path: '/project/finish/:id',
                name: 'FinishProject',
                component: FinishProject,
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

router.afterEach((to, from, failure) => {
    const mainStore = useMainStore();
    mainStore.updateActiveItem(to.name);
});

export default router;

import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        rail: false,
        items: [
            {
                name: 'Home',
                path: '/',
                icon: 'mdi-home-city',
                title: 'Início',
                isActive: true,
            },
            {
                name: 'Project',
                icon: 'mdi-pencil-ruler',
                title: 'Projeto',
                subItems: [
                    {
                        name: 'CreateProject',
                        path: '/project/create',
                        icon: 'mdi-plus-outline',
                        title: 'Criar',
                        isActive: false,
                    },
                    {
                        name: 'ListProject',
                        path: '/project/list',
                        icon: 'mdi-view-list',
                        title: 'Listar',
                        isActive: false,
                    },
                ],
            },
            {
                name: 'About',
                path: '/about',
                icon: 'mdi-information-outline',
                title: 'Sobre',
                isActive: false,
            },
            {
                name: 'Help',
                path: '/help',
                icon: 'mdi-help-circle-outline',
                title: 'Ajuda',
                isActive: false,
            },
        ],
        opened: [],
    }),
    actions: {
        updateActiveItem(activeRoute) {
            let isSubitem = false;
            this.items = this.items.map((item) => {
                if (item.subItems && item.subItems.length != 0) {
                    item.subItems = item.subItems.map((subItem) => {
                        if (subItem.name == activeRoute) {
                            isSubitem = true;
                            subItem.isActive = true;
                        } else {
                            subItem.isActive = false;
                        }

                        return subItem;
                    });
                } else {
                    item.isActive = item.name == activeRoute;
                }

                return item;
            });

            if (isSubitem) {
                if (this.opened.length == 0) {
                    this.opened = ['Project'];
                }
            } else {
                this.opened = [];
            }
        },
    },
});

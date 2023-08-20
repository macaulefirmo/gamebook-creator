<template>
    <v-app-bar color="light-blue-darken-1" prominent>
        <v-app-bar-nav-icon
            variant="text"
            @click.stop="rail = !rail"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        location="left"
        :rail="rail"
        permanent
    >
        <v-list density="compact" nav v-for="item in items">
            <v-list-group
                v-if="item.subItems && item.subItems.length != 0"
                :fluid="rail"
            >
                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        :prepend-icon="item.icon"
                        :title="item.title"
                    ></v-list-item>
                </template>

                <router-link
                    class="router-link"
                    :to="subItem.value"
                    v-for="subItem in item.subItems"
                >
                    <v-list-item
                        :prepend-icon="subItem.icon"
                        :title="subItem.title"
                    ></v-list-item>
                </router-link>
            </v-list-group>

            <router-link class="router-link" :to="item.value" v-else>
                <v-list-item
                    :prepend-icon="item.icon"
                    :title="item.title"
                ></v-list-item>
            </router-link>
        </v-list>
    </v-navigation-drawer>

    <div class="main-content">
        <v-container fluid>
            <slot></slot>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ['title'],
    data: () => ({
        drawer: true,
        rail: false,
        items: [
            {
                icon: 'mdi-home-city',
                title: 'Início',
                value: '/',
            },
            {
                icon: 'mdi-pencil-ruler',
                title: 'Projeto',
                subItems: [
                    {
                        icon: 'mdi-plus-outline',
                        title: 'Criar',
                        value: '/project/create',
                    },
                    {
                        icon: 'mdi-view-list',
                        title: 'Listar',
                        value: '/project/list',
                    },
                ],
            },
            {
                icon: 'mdi-information-outline',
                title: 'Sobre',
                value: '/about',
            },
            {
                icon: 'mdi-help-circle-outline',
                title: 'Ajuda',
                value: '/help',
            },
        ],
    }),
};
</script>

<style>
.main-content {
    padding: 10px;
}
.router-link {
    text-decoration: none;
    color: initial;
}
</style>

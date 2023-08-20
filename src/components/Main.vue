<template>
    <v-app-bar color="primary" prominent>
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

                <v-list-item
                    v-for="subItem in item.subItems"
                    :prepend-icon="subItem.icon"
                    :title="subItem.title"
                    :value="subItem.value"
                ></v-list-item>
            </v-list-group>

            <v-list-item
                v-else
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.value"
            ></v-list-item>
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
                value: 'home',
            },
            {
                icon: 'mdi-pencil-ruler',
                title: 'Projeto',
                value: 'project',
                subItems: [
                    {
                        icon: 'mdi-plus-outline',
                        title: 'Criar',
                        value: 'project/create',
                    },
                    {
                        icon: 'mdi-view-list',
                        title: 'Listar',
                        value: 'project/list',
                    },
                ],
            },
            {
                icon: 'mdi-information-outline',
                title: 'Sobre',
                value: 'info',
            },
            {
                icon: 'mdi-help-circle-outline',
                title: 'Ajuda',
                value: 'help',
            },
        ],
    }),
};
</script>

<style>
.main-content {
    padding: 10px;
}
</style>

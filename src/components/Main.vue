<template>
    <v-app-bar color="light-blue-darken-1" prominent>
        <v-app-bar-nav-icon
            variant="text"
            @click.stop="store.rail = !store.rail"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>

    <v-navigation-drawer location="left" :rail="store.rail" permanent>
        <v-list
            nav
            density="compact"
            v-for="item in store.items"
            v-model:opened="store.opened"
        >
            <v-list-group
                v-if="item.subItems && item.subItems.length != 0"
                :fluid="store.rail"
                value="Project"
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
                    :to="subItem.path"
                    v-for="subItem in item.subItems"
                >
                    <v-list-item
                        :prepend-icon="subItem.icon"
                        :title="subItem.title"
                        :active="subItem.isActive"
                    ></v-list-item>
                </router-link>
            </v-list-group>

            <router-link class="router-link" :to="item.path" v-else>
                <v-list-item
                    :prepend-icon="item.icon"
                    :title="item.title"
                    :active="item.isActive"
                ></v-list-item>
            </router-link>
        </v-list>
    </v-navigation-drawer>

    <div class="main-content h-100">
        <v-container class="h-100" fluid>
            <slot></slot>
        </v-container>
    </div>
</template>

<script>
import { useMainStore } from '@/store/components/main';

export default {
    props: ['title'],
    setup() {
        const store = useMainStore();

        return {
            store,
        };
    },
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

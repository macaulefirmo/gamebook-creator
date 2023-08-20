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
            <v-list-item
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
        rail: true,
        items: [
            {
                icon: 'mdi-home-city',
                title: 'Home',
                value: 'home',
            },
            {
                icon: 'mdi-account',
                title: 'My Account',
                value: 'account',
            },
            {
                icon: 'mdi-account-group-outline',
                title: 'Users',
                value: 'users',
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

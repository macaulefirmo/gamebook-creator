<template>
    <Main title="Projetos">
        <v-row no-gutters justify="center" class="w-100">
            <v-card class="w-100 rounded">
                <v-table class="text-center" density="compact">
                    <thead>
                        <tr>
                            <th
                                class="text-center font-weight-black b-solid-1"
                                v-for="header in headers"
                            >
                                {{ header.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in store.projects">
                            <td
                                class="b-solid-1"
                                :class="header.class"
                                v-for="header in headers"
                            >
                                <div v-if="header.key == 'actions'">
                                    <v-btn
                                        icon="mdi-trash-can-outline"
                                        color="error"
                                        variant="text"
                                        @click="this.delete(item['_id'])"
                                    ></v-btn>
                                </div>
                                <div v-else>
                                    {{ item[header.key] }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-row>
    </Main>
</template>

<script>
import { useListProjectStore } from '@/store/project/listProject';
import Main from '@/components/Main.vue';

export default {
    name: 'ListProject',
    components: {
        Main,
    },
    setup() {
        const store = useListProjectStore();

        return {
            store,
            dialog: false,
            headers: [
                { title: 'Nome', key: 'name', class: 'w-auto' },
                { title: 'Criado Em', key: 'createdAt', class: 'w-200p' },
                { title: 'Editado Em', key: 'updatedAt', class: 'w-200p' },
                { title: 'Ações', key: 'actions', class: 'w-200p' },
            ],
        };
    },
    mounted() {
        this.store.find();
    },
    methods: {
        delete(id) {
            console.log(`DELETE ${id}`);
        },
    },
};
</script>

<style>
.b-solid-1 {
    border: 1px solid #ddd;
}
.w-200p {
    width: 200px;
}
</style>

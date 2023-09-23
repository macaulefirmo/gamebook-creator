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
                        <tr
                            v-if="store.projects.length != 0"
                            v-for="(item, index) in store.projects"
                        >
                            <td
                                class="b-solid-1"
                                :class="header.class"
                                v-for="header in headers"
                            >
                                <div
                                    class="d-flex flex-row justify-center"
                                    v-if="header.key == 'actions'"
                                >
                                    <v-btn
                                        icon="mdi-pencil"
                                        color="blue-darken-2"
                                        variant="text"
                                        @click="toUpdate(index)"
                                    ></v-btn>
                                    <v-btn
                                        icon="mdi-trash-can-outline"
                                        color="error"
                                        variant="text"
                                        @click="showModal(index)"
                                    ></v-btn>
                                </div>
                                <div v-else>
                                    {{ item[header.key] }}
                                </div>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="4">Não há projetos cadastrados</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-row>

        <v-dialog v-model="store.showModal" width="auto">
            <v-card title="Deletar Projeto">
                <v-card-text>
                    Tem certeza que desaja deletar o projeto
                    <b>{{ getProjectName() }}</b
                    >?
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="outline" @click="store.showModal = false"
                        >Cancelar</v-btn
                    >
                    <v-btn color="error" @click="handleDelete()">Deletar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <VSonner position="top-right" duration="3000" expand="true"></VSonner>
    </Main>
</template>

<script>
import { useListProjectStore } from '@/store/project/listProject';
import Main from '@/components/Main.vue';
import { VSonner, toast } from 'vuetify-sonner';

export default {
    name: 'ListProject',
    components: {
        Main,
        VSonner,
    },
    setup() {
        const store = useListProjectStore();

        return {
            store,
            headers: [
                { title: 'Nome do Jogo', key: 'name', class: 'w-auto' },
                { title: 'Criado Em', key: 'createdAt', class: 'w-200p' },
                { title: 'Editado Em', key: 'updatedAt', class: 'w-200p' },
                { title: 'Ações', key: 'actions', class: 'w-100p' },
            ],
        };
    },
    mounted() {
        this.store.find();
    },
    methods: {
        showModal(index) {
            this.store.selected = index;
            this.store.showModal = true;
        },
        async handleDelete() {
            this.store.showModal = false;
            await this.store.delete();
            toast('Projeto deletado!', {
                cardProps: {
                    color: 'success',
                    width: '350',
                },
            });
        },
        toUpdate(index) {
            this.store.selected = index;
            let project = this.store.getSelectedProject();
            this.$router.push({ path: `/project/update/${project._id}` });
        },
        getProjectName() {
            let project = this.store.getSelectedProject();
            return project ? project.name : '';
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
.w-100p {
    width: 100px;
}
</style>

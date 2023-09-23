<template>
    <Main :title="store.project.name">
        <v-row no-gutters justify="center" class="h-100">
            <v-col>
                <v-combobox
                    class="mb-7"
                    hide-details
                    variant="outlined"
                    label="Selecione a Fase"
                    :items="store.stagesList"
                    :update:modelValue="store.changeCurrentStage()"
                    v-model="store.selectedStage"
                >
                </v-combobox>
                <div
                    v-for="(item, index) in store.project.stages"
                    :key="item.id"
                    v-show="store.currentStageIndex == index"
                >
                    <div class="text-h5 text-center">
                        {{ index + 1 }}ª Fase -
                        {{ item.type == 'reading' ? 'Leitura' : 'Pergunta' }}
                    </div>
                    <stage :stage="item"></stage>
                </div>

                <v-pagination
                    :length="store.project.stages.length"
                    v-model="store.currentPage"
                    :total-visible="5"
                    :update:modelValue="store.changePage()"
                ></v-pagination>

                <v-divider class="mt-6 mb-8"></v-divider>

                <div class="d-flex justify-end">
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-arrow-left-circle"
                        @click="store.dialogGoBack = true"
                    >
                        Sair
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-trash-can-outline"
                        color="error"
                        :disabled="store.project.stages.length == 1"
                        @click="store.dialogDelete = true"
                    >
                        Deletar Fase
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-plus-outline"
                        color="light-blue-darken-1"
                        @click="store.newStage()"
                    >
                        Nova Fase
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-content-save"
                        @click="save()"
                        color="success"
                    >
                        Salvar Projeto
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        prepend-icon="mdi-book-check-outline"
                        color="primary"
                        @click="finish()"
                    >
                        Finalizar
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <v-dialog v-model="store.dialogDelete" width="auto">
            <v-card title="Deletar Fase Atual">
                <v-card-text>
                    Tem certeza que deseja deletar a
                    <strong>{{ store.currentStageIndex + 1 }}ª fase</strong>? A
                    ordem será reajustada.
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="outline" @click="store.dialogDelete = false"
                        >Cancelar</v-btn
                    >
                    <v-btn color="error" @click="deleteCurrentStage()"
                        >Deletar</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="store.dialogGoBack" width="auto">
            <v-card title="Salvar o Projeto?">
                <v-card-text>
                    As alterações não salvas serão perdidas
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="outline" @click="goBack(false)">Sair</v-btn>
                    <v-btn color="success" @click="goBack(true)">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </Main>
    <VSonner position="top-right" duration="3000" expand="true"></VSonner>
</template>

<script>
import { useUpdateProjectStore } from '@/store/project/updateProject';
import Main from '@/components/Main.vue';
import Stage from '@/components/Stage.vue';
import { VSonner, toast } from 'vuetify-sonner';

export default {
    components: {
        Main,
        Stage,
        VSonner,
    },
    setup() {
        const store = useUpdateProjectStore();

        return {
            store,
        };
    },
    async mounted() {
        await this.store.load(this.$route.params.id);
    },
    methods: {
        async goBack(save) {
            this.isGoBack = true;
            this.store.dialogGoBack = false;

            if (save) {
                await this.store.save();
            }

            this.$router.push({
                path: this.store.isLeaveRoute
                    ? this.store.leaveRoute
                    : '/project/list',
            });
        },
        deleteCurrentStage() {
            this.store.dialogDelete = false;
            this.store.deleteStage();
        },
        async save() {
            await this.store.save();
            toast('Projeto salvo!', {
                cardProps: {
                    color: 'success',
                    width: '350',
                },
            });
        },
        finish() {
            this.$router.push({
                path: `/project/finish/${this.store.project._id}`,
            });
        },
    },
    beforeRouteLeave(to, from) {
        if (this.isGoBack) {
            this.store.$reset();
            return true;
        }

        this.store.leaveRoute = to.fullPath;
        this.store.isLeaveRoute = true;
        this.store.dialogGoBack = true;
        return false;
    },
};
</script>

<template>
    <Main :title="store.project.name">
        <v-row no-gutters class="w-100">
            <v-col>
                <div>
                    <div class="text-h6">Nome do Jogo</div>
                    <div class="ml-5 mt-2">{{ store.project.name }}</div>
                </div>

                <div class="mt-5">
                    <div class="text-h6">Número de Fases</div>
                    <div class="ml-5 mt-2">
                        {{ store.project.stages.length }}
                    </div>
                </div>

                <div class="mt-5">
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-book-play-outline"
                        @click="run()"
                        color="primary"
                        :loading="store.running"
                        :disabled="store.errors.length > 0"
                    >
                        Gerar EPUB
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-pencil"
                        :disabled="store.running"
                        @click="toUpdate()"
                        color="info"
                    >
                        Editar Projeto
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-file-eye-outline"
                        color="success"
                        :disabled="!store.builded"
                        v-show="store.errors.length == 0"
                        @click="store.preview()"
                    >
                        Visualizar
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        class="mr-3"
                        prepend-icon="mdi-open-in-new"
                        color="info"
                        :disabled="!store.builded"
                        v-show="store.errors.length == 0"
                        @click="store.showFile()"
                    >
                        Abrir
                    </v-btn>
                </div>
                <div class="mt-5" v-if="store.errors.length > 0">
                    <div class="mb-3">
                        <v-alert
                            title="Existem Fases com Erro!"
                            text="Foram encontrados erros em algumas fases. Corrija-os e tente novamente"
                            icon="$error"
                            variant="outlined"
                            color="error"
                        ></v-alert>
                    </div>
                    <div class="font-weight-bold ms-1 mb-2">Erros</div>
                    <v-timeline density="compact" align="start">
                        <v-timeline-item
                            v-for="(error, index) in store.errors"
                            :key="index"
                            dot-color="error"
                            size="x-small"
                        >
                            <div class="mb-4">
                                <div class="font-weight-normal">
                                    <strong
                                        >{{ error.stage }}ª Fase ({{
                                            error.type == 'reading'
                                                ? 'Leitura'
                                                : 'Pergunta'
                                        }})</strong
                                    >
                                </div>
                                <div v-for="message in error.messages">
                                    {{ message }}
                                </div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </div>
            </v-col>
        </v-row>

        <VSonner position="top-right" duration="3000" expand="true"></VSonner>
    </Main>
</template>

<script>
import { useFinishProjectStore } from '@/store/project/finishProject';
import Main from '@/components/Main.vue';
import { VSonner, toast } from 'vuetify-sonner';

export default {
    name: 'FinishProject',
    components: {
        Main,
        VSonner,
    },
    setup() {
        const store = useFinishProjectStore();

        return {
            store,
        };
    },
    async mounted() {
        await this.store.load(this.$route.params.id);
    },
    methods: {
        async run() {
            this.store.running = true;
            this.validate();
            if (this.store.errors.length > 0) {
                this.store.running = false;
                return;
            }

            if (await this.store.build()) {
                toast('Executável EPUB gerado com sucesso!', {
                    cardProps: {
                        color: 'success',
                        width: '350',
                    },
                });
            } else {
                toast('Oops! Ocorreu um erro ao gerar o arquivo', {
                    cardProps: {
                        color: 'success',
                        width: '350',
                    },
                });
            }

            this.store.running = false;
        },
        validate() {
            this.store.errors = [];
            this.store.project.stages.forEach((stage, index) => {
                if (stage.type == 'reading') {
                    if (!stage.text || stage.text.trim() == '') {
                        this.store.errors.push({
                            stage: index + 1,
                            type: stage.type,
                            messages: ['Texto não informado'],
                        });
                    }
                } else {
                    let messages = [];

                    if (!stage.question || stage.question.trim() == '') {
                        messages.push('Pergunta não informada');
                    }
                    if (stage.alternatives.length == 0) {
                        messages.push('Alternativas não criadas');
                    } else {
                        stage.alternatives.forEach((alternative, index) => {
                            if (!alternative || alternative.trim() == '') {
                                messages.push(
                                    `Alternativa ${index + 1} não informada`,
                                );
                            }
                        });
                    }

                    if (messages.length > 0) {
                        this.store.errors.push({
                            stage: index + 1,
                            type: stage.type,
                            messages,
                        });
                    }
                }
            });
        },
        toUpdate() {
            this.$router.push({
                path: `/project/update/${this.store.project._id}`,
            });
        },
    },
    beforeRouteLeave(to, from) {
        this.store.$reset();
    },
};
</script>

<template>
    <div>
        <v-form ref="formStage" @submit.prevent>
            <div class="d-flex align-center mb-0">
                <div class="mr-3">Leitura</div>
                <div>
                    <v-switch
                        color="info"
                        hide-details
                        v-model="isQuestion"
                    ></v-switch>
                </div>
                <div class="ml-3">Pergunta</div>
            </div>
            <div v-if="!isQuestion">
                <v-textarea
                    counter
                    rows="12"
                    row-height="30"
                    variant="outlined"
                    label="Digite o Texto para Leitura"
                    v-model="stage.text"
                    :maxlength="1000"
                ></v-textarea>
                <div>
                    <div
                        class="d-flex align-center mb-4"
                        v-if="stage.image != null"
                    >
                        <div>
                            <v-btn
                                class="mr-2"
                                prepend-icon="mdi-image"
                                variant="outlined"
                                @click="removeImage()"
                            >
                                Remover
                            </v-btn>
                        </div>
                        <div>
                            {{ getFileName() }}
                        </div>
                    </div>
                    <div v-else>
                        <v-file-input
                            class="mt-2"
                            label="Selecione a Imagem"
                            variant="outlined"
                            accept="image/*"
                            show-size
                            prepend-icon="mdi-image"
                            hide-details
                            v-model="image"
                            :update:modelValue="changeImage()"
                        ></v-file-input>
                        <div class="ml-10 mt-2 mb-4 text-grey">
                            <div>
                                Obs: Ao utilizar imagem, não adicione um texto
                                grande para não haver sobreposição
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <v-textarea
                    counter
                    rows="5"
                    row-height="30"
                    variant="outlined"
                    label="Digite a Pergunta"
                    v-model="stage.question"
                    :maxlength="500"
                ></v-textarea>
                <v-select
                    class="w-300p"
                    label="Número de Alternativas"
                    variant="outlined"
                    :items="[2, 3, 4, 5]"
                    v-model="qtdAlternatives"
                    :update:modelValue="updateQtdAlternatives()"
                ></v-select>
                <div>
                    <v-radio-group v-model="stage.responseIndex" hide-details>
                        <div
                            class="d-flex flex-row align-center mb-5"
                            v-for="(item, index) in stage.alternatives"
                        >
                            <v-text-field
                                class="w-75"
                                variant="outlined"
                                :label="`Alternativa ${index + 1}`"
                                v-model="stage.alternatives[index]"
                                hide-details
                                :maxlength="100"
                            ></v-text-field>
                            <v-radio
                                class="align-self-center"
                                label="Resposta correta"
                                :value="index"
                                color="light-blue-darken-1"
                            ></v-radio>
                        </div>
                    </v-radio-group>
                </div>
            </div>
        </v-form>
    </div>
</template>

<script>
export default {
    props: ['stage'],
    data: () => ({
        image: [],
        isQuestion: false,
        qtdAlternatives: '',
    }),
    created() {
        this.isQuestion = this.stage.type == 'question';

        if (this.isQuestion && this.stage.alternatives.length > 0) {
            this.qtdAlternatives = this.stage.alternatives.length;
        }
    },
    watch: {
        isQuestion(value) {
            this.stage.type = value ? 'question' : 'reading';
        },
    },
    methods: {
        updateQtdAlternatives() {
            if (this.stage.alternatives.length != this.qtdAlternatives) {
                let data = [];
                for (let qtd = 0; qtd < this.qtdAlternatives; qtd++) {
                    if (qtd in this.stage.alternatives) {
                        data[qtd] = this.stage.alternatives[qtd];
                    } else {
                        data[qtd] = '';
                    }
                }
                this.stage.alternatives = data;

                if (
                    this.stage.responseIndex >
                    this.stage.alternatives.length - 1
                ) {
                    this.stage.responseIndex =
                        this.stage.alternatives.length - 1;
                }
            }
        },
        changeImage() {
            if (this.image && this.image.length > 0) {
                this.stage.image = this.image[0];
            }
        },
        getFileName() {
            if (this.stage.image instanceof File) {
                return this.stage.image.name;
            }

            if (!this.stage.image) {
                return null;
            }

            let steps = this.stage.image.split('/');
            return steps[steps.length - 1];
        },
        removeImage() {
            this.stage.image = null;
            this.image = null;
        },
    },
};
</script>

<style>
.w-300p {
    width: 300px;
}
.text-grey {
    color: #ddd;
}
</style>

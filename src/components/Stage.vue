<template>
    <div>
        <v-form ref="formStage" @submit.prevent>
            <div class="d-flex align-center">
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
                    rows="18"
                    row-height="30"
                    variant="outlined"
                    label="Digite o Texto para Leitura"
                    v-model="stage.text"
                ></v-textarea>
            </div>
            <div v-else>
                <v-textarea
                    counter
                    rows="5"
                    row-height="30"
                    variant="outlined"
                    label="Digite a Pergunta"
                    v-model="stage.question"
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
    },
};
</script>

<style>
.w-300p {
    width: 300px;
}
</style>

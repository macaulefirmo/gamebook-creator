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
                    label="Digite o texto a ser exibido"
                    v-model="text"
                ></v-textarea>
            </div>
            <div v-else>
                <v-textarea
                    counter
                    rows="5"
                    row-height="30"
                    variant="outlined"
                    label="Digite a pergunta"
                    v-model="question"
                ></v-textarea>
                <v-select
                    class="w-300p"
                    label="Selecione o número de alternativas"
                    variant="outlined"
                    :items="[2, 3, 4, 5]"
                    v-model="qtdAlternatives"
                ></v-select>

                <div>
                    <v-radio-group v-model="correctAlternative">
                        <div
                            class="d-flex flex-row align-center mb-5"
                            v-for="index in qtdAlternatives"
                        >
                            <v-text-field
                                class="w-75"
                                variant="outlined"
                                :label="`Alternativa ${index}`"
                                v-model="alternatives[index]"
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
        text: '',
        question: '',
        qtdAlternatives: 2,
        alternatives: [],
        correctAlternative: 1,
    }),
    created() {
        this.isQuestion = this.stage.type == 'question';
    },
    watch: {
        isQuestion(value) {
            this.stage.type = value ? 'question' : 'reading';
        },
    },
};
</script>

<style>
.w-300p {
    width: 300px;
}
</style>

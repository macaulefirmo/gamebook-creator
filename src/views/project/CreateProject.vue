<template>
    <Main title="Novo Projeto">
        <v-row no-gutters justify="center" align="center" class="h-100">
            <v-col>
                <v-form ref="form" @submit.prevent>
                    <div>
                        <v-text-field
                            variant="outlined"
                            label="Qual será o nome do seu jogo?"
                            v-model="store.project.name"
                            :rules="nameRules"
                            required
                        ></v-text-field>
                    </div>
                    <div class="d-flex flex-row-reverse mt-2">
                        <v-btn variant="outlined" @click="save">
                            Próximo
                        </v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </Main>
</template>

<script>
import { useCreateProjectStore } from '@/store';
import Main from '@/components/Main.vue';

export default {
    props: ['title'],
    components: {
        Main,
    },
    setup() {
        const store = useCreateProjectStore();

        return {
            store,
            nameRules: [
                (v) => !!v || 'Informe o nome do seu jogo!',
                (v) =>
                    (v && v.length <= 100) ||
                    'O nome deve ter no máximo 100 caracteres!',
            ],
        };
    },
    methods: {
        async save() {
            const { valid } = await this.$refs.form.validate();

            if (!valid) {
                return;
            }

            await this.store.create();
        },
    },
};
</script>

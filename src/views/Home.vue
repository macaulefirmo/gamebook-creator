<template>
    <Main title="Início">
        <v-row class="h-100" justify="center" align-self="center">
            <div class="d-flex flex-column justify-center align-center">
                <div>
                    <img
                        :src="
                            require('@/assets/images/undraw_books_re_8gea.svg')
                        "
                    />
                </div>
                <div class="mt-5">
                    <v-btn
                        color="blue-darken-4"
                        variant="outlined"
                        prepend-icon="mdi-plus"
                        @click="teste()"
                    >
                        Novo Projeto
                    </v-btn>
                </div>
            </div>
        </v-row>
    </Main>
</template>

<script>
import Main from '@/components/Main.vue';

export default {
    name: 'Home',
    components: {
        Main,
    },
    data: () => ({}),
    methods: {
        teste() {
            console.log('Teste');
        },
    },
};
</script>

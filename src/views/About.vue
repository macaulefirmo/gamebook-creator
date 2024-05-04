<template>
    <Main title="Sobre">
        <v-row>
            <div>
                Trabalho desenvolvido para a disciplina de TCC (Trabalho de
                Conclusão de Curso) do curso de Engenharia da Computação da UEFS
                (Universidade Estadual de Feira de Santana), criada por Macaule
                Firmo Oliveira com orientação do professor Dr. Victor Travassos
                Sarinho.
            </div>
            <div class="mt-2">
                Está ferramenta destina-se a criação de jogos digitais de estilo
                quiz que possa ser utilizada por pessoas sem conhecimentos
                técnicos na área de programação e desenvolvimento de jogos, além
                de possibilitar um compartilhamento dos jogos criados de uma
                maneira simples, rápida e compatível com diversos dispositivos.
            </div>
        </v-row>
    </Main>
</template>

<script>
import Main from '@/components/Main.vue';

export default {
    name: 'About',
    components: {
        Main,
    },
    data: () => ({}),
};
</script>

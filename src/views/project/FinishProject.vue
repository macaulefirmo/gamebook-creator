<template>
    <Main :title="store.project.name">
        <v-row no-gutters justify="center" class="w-100"> Finish </v-row>
    </Main>
</template>

<script>
import { useFinishProjectStore } from '@/store/project/finishProject';
import Main from '@/components/Main.vue';

export default {
    name: 'FinishProject',
    components: {
        Main,
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
    methods: {},
};
</script>

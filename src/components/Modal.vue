<script>
export default {
    props: {
        show: Boolean,
    },
};
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header text-h5 font-weight-bold">
                    <slot name="header">{{ title }}</slot>
                </div>
                <v-divider></v-divider>
                <div class="modal-body">
                    <slot name="body">{{ content }}</slot>
                </div>
                <v-divider></v-divider>
                <div class="modal-footer d-flex justify-end">
                    <v-btn class="mr-3" color="error" @click="$emit('confirm')">
                        Deletar
                    </v-btn>
                    <v-btn
                        variant="flat"
                        color="grey-lighten-3"
                        @click="$emit('close')"
                    >
                        Cancelar
                    </v-btn>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    max-width: 90%;
    max-height: 90%;
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header {
    padding: 15px 20px;
}

.modal-body {
    padding: 20px 30px;
    word-wrap: break-word;
}

.modal-footer {
    padding: 15px 20px;
    word-wrap: break-word;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

<template>
    <v-container :style="{minWidth: $store.getters['appearance/getAppWidth'] + 'px'}" class="loader-container">
        <div class="loader"></div>
    </v-container>
</template>

<script>
export default {
    name: "Loader",
    data() {
        return {};
    },
    computed: {},
    methods: {}
};
</script>

<style lang="scss">
    .loader-container {
        min-height: 450px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loader {
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
        border: 3px solid #ddd;
        border-top: 3px solid #42a5f5;
        border-radius: 50%;
        height: 75px;
        width: 75px;
    }

    @-webkit-keyframes spin {
        to {
            border-top-color: #ec407a;
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes spin {
        to {
            border-top-color: #ec407a;
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
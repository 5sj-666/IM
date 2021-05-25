<template>
    <header class="libre-header">
        <img @click="goBack" style="width: 1.4rem; height: 1.4rem" src="../assets/icon/icon-back.png" alt="" />
        <span>标题</span>
        <span>图标</span>
    </header>
</template>
<script>
import {useRouter} from "vue-router"

export default {
    name: "LibreHeader",
    setup() {
        const Router = useRouter();

        function goBack() {
            Router.go(-1);
        }
        return { goBack }
    },
}
</script>
<style scoped>
    .libre-header {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3rem auto 3rem;
        align-items: center;
        background-color: var(--header-bg, #FFF);
    }

</style>
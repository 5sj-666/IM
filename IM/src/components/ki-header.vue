<template>
    <header class="ki-header">
        <img class="ki-goback" src="@/assets/icon/icon-back.png" @click="goBack" v-if="iconBack" alt="返回图标" />
        <span v-else></span>
        <span>{{props.title}}</span>
        <!-- <span>图标</span> -->
        <slot name="icons"></slot>
    </header>
</template>
<script>
import {useRouter} from "vue-router"

export default {
    name: "kiHeader", //kiteHeader
    props: {
        title: {
            type: String,
            degfault: "",
        },
        iconBack: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const Router = useRouter();
        // console.log("---libreHeader: props: ", props.title);

        function goBack() {
            Router.go(-1);
        }
        return { goBack, props}
    },
}
</script>
<style scoped>
    .ki-header {
        position: absolute;
        left: 0;
        top: 0;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3rem auto 3rem;
        align-items: center;
        width: 100%;
        height: 3.26rem;
        background-color: var(--header-bg, #FFF);
        z-index: 10;
    }

    .ki-goback {
        width: 1.4rem;
        height: 1.4rem
    }

</style>
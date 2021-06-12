<template>
    <header class="libre-header">
        <img 
            class="icon-goback"
            src="@/assets/icon/icon-back.png" 
            @click="goBack" 
            alt="返回图标" 
        />
        <span>{{props.title}}</span>
        <span>图标</span>
    </header>
</template>
<script>
import {useRouter} from "vue-router"

export default {
    name: "LibreHeader",
    props: {
        title: String
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
    .libre-header {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3rem auto 3rem;
        align-items: center;
        background-color: var(--header-bg, #FFF);
    }

    .icon-goback {
        width: 1.4rem;
        height: 1.4rem
    }

</style>
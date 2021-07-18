<template>
    <article class="setting-page">
        <ki-header title="设置"></ki-header>
        <ki-cell
            v-for="(cell, index) in cells"
            iconWidth="1"
            :key="index"
            :name="cell.name"
            :isLast="index == cells.length - 1 ? true : false"
            :showNextIcon="false"
            @click="cellsEvent(cell.name)"
        >
            <!-- <img style="width: 1.5rem;height: 1.5rem;" :src="cell.icon" /> -->
        </ki-cell>
    </article>
</template>
<script>
import kiHeader from "@/components/ki-header.vue";
import KiCell from "@/components/ki-cell.vue";
import {reactive} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


export default {
    name: "setting",
    components: {
        kiHeader,
        KiCell
    },
    setup() {
        const Router =  useRouter();
        const Store = useStore();

        let cells = reactive([]);
        cells = [
            {
                icon: require("@/assets/icon/me-setting.png"),
                name: "切换全屏",
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                name: "退出登录",
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                name: "语言: 中文",
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                name: "language: english",
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                name: "黑暗模式",
            },
        ];

        function cellsEvent(name) {
            console.log("--proxyEvent: ", name);
            const eventMapping = {
                "切换全屏": launchFullScreen,
                "退出登录": loginOut,
                "语言: 中文": changeLang.bind(this, "zhCN"),
                "language: english": changeLang.bind(this,"en"),
                "黑暗模式": changeTheme.bind(this, "dark"),
            }
            Reflect.has(eventMapping, name) ? eventMapping[name]() : "";
        }

        function launchFullScreen() {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }

        function loginOut() {
            console.log("---登出---");
            localStorage.setItem('token', '');
            Router.replace('/login');
        }

        function changeLang(lang) {
            console.log("---Setting changLang event: ");
            Store.commit("SET_LANG", {lang});
        }

        function changeTheme(type) {
            console.log("---Setting changeTheme: ", type);
            document.documentElement.dataset.theme = "dark";
        }

        return {
            cells,
            cellsEvent
        }
    },
}
</script>
<style scoped>
    .setting-page {
        /* --Setting-bg: orange; */
        width: 100%;
        height: 100%;
        /* background: orange; */
        background-color: var(--Setting-bg, #ededed);
    }

</style>
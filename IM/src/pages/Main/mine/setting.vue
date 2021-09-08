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
            @click="cellsEvent(index)"
        >
            <!-- <img style="width: 1.5rem;height: 1.5rem;" :src="cell.icon" /> -->
        </ki-cell>

        <ki-modal 
            :content="t('App.Setting.modalText')"
            v-model="showModal"
            @onConfirm="modalConfirm"
        />
    </article>
</template>
<script>
import kiHeader from "@/components/ki-header.vue";
import KiCell from "@/components/ki-cell.vue";
import {reactive, ref} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useI18n from "@/local/index";

import KiModal from "@/components/ki-modal.vue";



export default {
    name: "setting",
    components: {
        kiHeader,
        KiCell,
        KiModal
    },
    setup() {
        const Router =  useRouter(),
              Store = useStore(),
              { t } = useI18n();

        let cells = reactive([]);
        cells = [
            // {
            //     icon: require("@/assets/icon/me-setting.png"),
            //     // name: "切换全屏",
            //     name: t('App.Setting.fullScreen')
            // },
            {
                icon: require("@/assets/icon/me-setting.png"),
                // name: "退出登录",
                name: t('App.Setting.logout'),
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                // name: "语言: 中文",
                name: t('App.Setting.chinese')
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                // name: "language: english",
                name: t('App.Setting.english')
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                // name: "黑暗模式",
                name: t('App.Setting.darkMode')
            },
            {
                icon: require("@/assets/icon/me-setting.png"),
                // name: "普通模式",
                name: t('App.Setting.normalMode')
            },
        ];
        console.log("---t('APP.Setting.fullScreen'): ", t('App.Setting.fullScreen'));
    // debugger;
        function cellsEvent(name) {
            console.log("--proxyEvent: ", name);
            // const eventMapping = {
            //     "切换全屏": launchFullScreen,
            //     "退出登录": loginOut,
            //     "语言: 中文": changeLang,
            //     "语言：英语": changeLang,
            //     "language: chinese": changeLang,
            //     "language: english": changeLang,
            //     "黑暗模式": changeTheme.bind(this, "dark"),
            //     "普通模式": changeTheme.bind(this, ""),
            // }
            // debugger;
            name += 1;
            const eventMapping = {
                "0": launchFullScreen,
                "1": loginOut,
                "2": changeLang('zhCN'),
                "3": changeLang('en'),
                "4": changeTheme.bind(this, "dark"),
                "5": changeTheme.bind(this, ""),
            }
            Reflect.has(eventMapping, name) ? eventMapping[name]() : "";
        }

        /**
         * @description 打开全屏
         */
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

        /**
         * @description 登出
         */
        function loginOut() {
            // console.log("---登出---");
            localStorage.setItem('token', '');
            Router.replace('/login');
        }

        let showModal = ref(false);
        let lang = ref('');

        function changeLang(type) {
            return () => {
                showModal.value = true;
                lang.value = type;
                // debugger;
            }
        }

        function modalConfirm() {
            if(lang.value === Store.state.lang) {
                return ;
            }

            Store.commit("SET_LANG", {lang: lang.value});
            // debugger;

            window.location.href="/";
        }



        /**
         * @description: 主题切换
         * @params {String} type (dark, normal)
         */
        function changeTheme(type) {
            console.log("---Setting changeTheme: ", type);
            localStorage.setItem("theme", type);
            document.documentElement.dataset.theme = type;
        }





        return {
            cells,
            cellsEvent,

            t,

            showModal,
            modalConfirm,
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
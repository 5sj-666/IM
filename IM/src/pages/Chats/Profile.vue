<template>
    <article class="profile-page">
        <!-- <header>
            <img @click="goBack()" style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-back.png" alt="返回图标">
        </header> -->
        <libre-header />


        个人信息页面!!

        <div class="profile-btn">发消息</div>
        <div class="profile-btn">音视频通话</div>

    </article>
</template>
<script>

import { defineComponent } from 'vue';
import { useRouter } from "vue-router";

import LibreHeader from '@/components/libre-header';

export default defineComponent({
    name: "ProfilePage",
    components: {
        LibreHeader
    },
    setup() {
        const Router = useRouter();
        // goBack();
        function goBack() {
            Router.go(-1);
        }
        return { goBack }
    },
})

</script>
<style scoped>
    .profile-page {
        --profile_bg: #ededed;
        /* 主背景色调 */
        --profile-main_bg: rgba(255,255,255, 1);
        --profile_color: #121212;

        --profile-header_color: #FFF;
        --profile_hint: #a4a4a4;

        --profile-button_color: #576b86;
        --profile-button_bg: var(--profile-main_bg);

        --profile-font: 1.09rem;

        width: 100%;
        height: 100%;
        background-color: var(--profile_bg);
    }

    .profile-page header {
        width: 100%;
        height: 3.26rem;

        background-color: var(--profile-header_color);
    }

    .profile-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 3.26rem;
        background: var(--profile-button_bg, "#FFF");
        color: var(--profile-button_color);
        font-size: var(--profile-font);
        border-bottom: 1px solid #e2e2e2;
    }
</style>